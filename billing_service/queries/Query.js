class Query {
    constructor(Model) {
      this.Model = Model;
    }
    create(payload) {
      return this.Model.create(payload);
    }
  
    findOne(payload) {
      return this.Model.findOne(payload).exec();
    }
  
    update(payload, where) {
      return this.Model.findOneAndUpdate(where, payload, { new: true }).exec();
    }
  
    delete(payload) {
      return this.Model.deleteOne(payload).exec();
    }
}
  
module.exports = Query;