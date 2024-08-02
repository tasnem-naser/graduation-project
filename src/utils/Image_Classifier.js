import * as tf from "@tensorflow/tfjs-node";
import { Image, createCanvas } from "canvas";
import * as fs from "fs";
import axios from "axios";
import classes from "./imagenet_classes.js";
export default class ImageClassifier {
  constructor() {
    this.model = null;
    this.modelPromise = this.loadModel(); // Save the promise when initializing
  }

  async loadModel() {
    try {
      console.log("Loading model...");
      this.model = await tf.loadLayersModel(
        "https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json"
      );
      console.log("Model loaded successfully.");
    } catch (error) {
      console.error("Failed to load model:", error);
    }
  }

  async loadAndPadImage(imgPath, targetSize = 224) {
    const img = await this.readImage(imgPath);
    const canvas = createCanvas(targetSize, targetSize);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FFF";
    ctx.fillRect(0, 0, targetSize, targetSize);
    const scale = Math.min(targetSize / img.width, targetSize / img.height);
    const newWidth = img.width * scale;
    const newHeight = img.height * scale;
    ctx.drawImage(
      img,
      (targetSize - newWidth) / 2,
      (targetSize - newHeight) / 2,
      newWidth,
      newHeight
    );
    const imageData = tf.browser.fromPixels(canvas);
    return imageData
      .expandDims(0)
      .toFloat()
      .div(tf.scalar(127.5))
      .sub(tf.scalar(1));
  }

//   readImage(path) {
//     return new Promise((resolve, reject) => {
//       const img = new Image();
//       img.onload = () => resolve(img);
//       img.onerror = (err) => reject(err);
//       img.src = fs.readFileSync(path);
//     });
//   }
 readImage(imageUrl) {
    return new Promise((resolve, reject) => {
      axios.get(imageUrl, { responseType: 'arraybuffer' })
        .then(response => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = (err) => reject(err);
          img.src = 'data:image/jpeg;base64,' + Buffer.from(response.data, 'binary').toString('base64');
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  async classifyImage(imgPath) {
    await this.modelPromise; // Ensure the model is loaded before classifying
    console.log("Loading image...");
    const imgArray = await this.loadAndPadImage(imgPath);

    console.log("Predicting...");
    const predictions = this.model.predict(imgArray);

    console.log("Decoding predictions...");
    const decoded = await this.decodePredictions(predictions, 1);
    console.log(
      `Prediction: ${decoded[0].className} with a probability of ${(
        decoded[0].probability * 100
      ).toFixed(2)}%`
    );
    return decoded[0];
  }

  async decodePredictions(logits, topK) {
    const { values, indices } = tf.topk(logits, topK);
    const valuesArr = await values.data();
    const indicesArr = await indices.data();

    //import classes from ("./imagenet_classes.js"); // Ensure this file is correctly mapped
    return Array.from(indicesArr).map((index, i) => {
      return {
        className: classes[index], // index to className mapping
        probability: valuesArr[i],
      };
    });
  }
}
