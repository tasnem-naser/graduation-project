import Joi from "joi"

const signUpVal = Joi.object({
    firstName: Joi.string().trim().required().min(2).max(15),
    lastName: Joi.string().trim().required().min(2).max(15),
    userName: Joi.string().min(2).lowercase().required().trim(),
    email: Joi.string().pattern(/[A-Za-z0-9]{3,50}@(gmail|yahoo).com$/).required(),
    Age: Joi.number().integer().positive().required(),
    address: Joi.string().min(2).required().trim(),
    password: Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).required(),
    rePassword: Joi.valid(Joi.ref("password")).required(),
    DOB: Joi.string().pattern(/^\d{4}-\d{1,2}-\d{1,2}$/).trim().required(),
    phone: Joi.string().pattern(/^01[0125][0-9]{8}$/).required(),
    Gender:Joi.string().required(),
    role:Joi.string().valid('User','Admin').optional(),
    image:Joi.object({
      fieldname:Joi.string().required(),
      originalname:Joi.string().required() ,
      encoding:Joi.string().required(), 
      mimetype:Joi.string().valid('image/jpeg','image/png','image/jpg').required(),
      size:Joi.number().max(5242880).required(),
      destination:Joi.string().required(),
      filename:Joi.string().required(),
      path:Joi.string().required(),
      

      }).required()
  
  });



  const signInVal = Joi.object({
    emailOrMobile: Joi.string().required(),
    password: Joi.string()
      .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
      .required(),
  });

const paramsValId = Joi.object({
    id: Joi.string().hex().length(24).required(),
})

const userUpadteval = Joi.object({
    id: Joi.string().hex().length(24).required(),
    firstName: Joi.string().trim().min(2).max(15),
    lastName: Joi.string().trim().min(2).max(15),
    userName: Joi.string().min(2).lowercase().trim(),
    email: Joi.string().pattern(/[A-Za-z0-9]{3,50}@(gmail|yahoo).com$/),
    Age: Joi.number().integer().positive(),
    address: Joi.string().min(2).trim(),
    DOB: Joi.string().pattern(/^\d{4}-\d{1,2}-\d{1,2}$/).trim(),
    phone: Joi.string().pattern(/^01[0125][0-9]{8}$/),
    Gender:Joi.string(),
    role:Joi.string().valid('User','Admin').optional(),

    })

const forgetPasswordVal = Joi.object({
  email: Joi.string().pattern(/[A-Za-z0-9]{3,50}@(gmail|yahoo).com$/).required(),
});
const resetPasswordVal = Joi.object({
  email: Joi.string().pattern(/[A-Za-z0-9]{3,50}@(gmail|yahoo).com$/).required(),
  otp: Joi.string().trim().required(),
  newPassword: Joi.string().pattern(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  ),
});
const UpdatePasswordVal = Joi.object({
    currentPassword: Joi
      .string()
      .required(),
    newPassword: Joi
      .string()
      .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),
    renewPassword: Joi.valid(Joi.ref("newPassword")).required(),
  });

export {
    signUpVal,
    signInVal,
    userUpadteval,
    forgetPasswordVal,
    resetPasswordVal,
    UpdatePasswordVal,
    paramsValId
}