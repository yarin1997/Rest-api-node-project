import Joi from "joi";

  const addressJoiSchema = Joi.object({
  state: Joi.string().required(),
  country: Joi.string().required(),
  city: Joi.string().required(),
  street: Joi.string().required(),
  houseNumber: Joi.string().required(),
  zip: Joi.string().required(),
});

const imageJoiSchema = Joi.object({
  url: Joi.string().required(),
  alt: Joi.string().required(),
});

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name:Joi.object ({ first:Joi.string().min(2).required(),
          middle: Joi.string().min(2).optional(),
          last:Joi.string().min(2).required()
  }).required(),
  adress: addressJoiSchema.required(),
  image: imageJoiSchema.optional(),
  phoneNumber: Joi.string().optional(),
  isBusiness: Joi.boolean().optional(),
  isAdmin: Joi.boolean().optional(),
});

export const updateSchema = Joi.object({
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
 name: Joi.object({
    first: Joi.string().min(2).optional(),
    middle: Joi.string().min(2).optional(),
    last: Joi.string().min(2).optional()
  }).optional(),
  adress: addressJoiSchema.optional(),
  image: imageJoiSchema.optional(),
  phoneNumber: Joi.string().optional(), 
  isBusiness: Joi.boolean().optional(),
  isAdmin: Joi.boolean().optional(),
});