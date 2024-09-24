import Joi from 'joi';

const phoneRegex= /^(\+?\d{1,4}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;
const emailRegex= /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$/;

// Define the Joi schema for the address
export const addressSchema = Joi.object({
  state: Joi.string().required(),
  country: Joi.string().required(),
  city: Joi.string().required(),
  street: Joi.string().required(),
  houseNumber: Joi.string().required(),
  zip: Joi.string().required()
});

// Define the Joi schema for the image
export const imageSchema = Joi.object({
  url: Joi.string().uri().required(),
  alt: Joi.string().required()
});

// Define the Joi schema for the card
export const cardSchema = Joi.object({
  title: Joi.string().required(),
  subtitle: Joi.string().required(),
  description: Joi.string().required(),
  phone: Joi.string().required().regex(phoneRegex),
  email: Joi.string().email().required().regex(emailRegex),
  web: Joi.string().uri().required(),
  image: imageSchema.required(),
  address: addressSchema.required(),
  
})

export const addressSchemaUpdate = Joi.object({
  state: Joi.string().optional(),
  country: Joi.string().optional(),
  city: Joi.string().optional(),
  street: Joi.string().optional(),
  houseNumber: Joi.string().optional(),
  zip: Joi.string().optional()
});

// Define the Joi schema for the image (for updating, fields are optional)
export const imageSchemaUpdate = Joi.object({
  url: Joi.string().uri().optional(),
  alt: Joi.string().optional()
});

// Define the Joi schema for updating the card (fields are optional)
export const cardSchemaUpdate = Joi.object({
  title: Joi.string().optional(),
  subtitle: Joi.string().optional(),
  description: Joi.string().optional(),
  phone: Joi.string().optional().regex(phoneRegex),
  email: Joi.string().email().optional().regex(emailRegex),
  web: Joi.string().uri().optional(),
  image: imageSchemaUpdate.optional(),
  address: addressSchemaUpdate.optional()
});