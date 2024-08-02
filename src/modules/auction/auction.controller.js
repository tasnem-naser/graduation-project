import { AuctionModel } from "../../../databases/models/auction.model.js"
import { catchError } from "../../middleware/catchError.js"

const addacuction = catchError(async(req,res,next) => {
    let auction =  new AuctionModel(req.body)
    console.log (req.body)
    await auction.save()
    res.status(200).json({massage:"success",auction})
  })

  
  
  
 const getauction=catchError(async(req,res,next) => {
    try {
        const auction = await AuctionModel.find({ProductId:req.params.productId});
        if (!auction) {
            return res.status(404).send('Auction not found');
        }
        res.json(auction);
    } catch (error) {
        res.status(500).send('Server error');
    }
  });
  
  
 const updateauction= catchError(async(req,res,next) => {
    try {
        const { UserId, newPrice } = req.body;
        if (!UserId || newPrice === undefined) {
            return res.status(400).send('UserId and newPrice are required');
        }
  
        const auction = await AuctionModel.findOne({ ProductId: req.params.productId });
        if (!auction) {
            return res.status(404).send('Auction not found');
        }
  
        if (newPrice <= auction.highestPrice) {
            return res.status(400).send('New price must be higher than the current highest price');
        }
  
        auction.UserId = UserId;
        auction.highestPrice = newPrice;
        await auction.save();
  
        res.json(auction);
    } catch (error) {
        res.status(500).send('Server error');
    }
  });





  export{
    addacuction,
    getauction,
    updateauction
  }