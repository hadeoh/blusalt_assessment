const { Joi } = require('celebrate');

const accountFundingValidation = {
  request: {
    body: {
      amount: Joi.number()
        .required(),
      customerId: Joi.string().required()
    }
  },
};

export default accountFundingValidation;