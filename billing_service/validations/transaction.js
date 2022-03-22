const { Joi } = require('celebrate');

const transactionValidation = {
  transaction: {
    body: {
      amount: Joi.number()
        .required(),
      customerId: Joi.string().required()
    }
  },
};

export default transactionValidation;