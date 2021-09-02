import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var category = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  slug: {
    type: String,
    required: function() {
      return this.slug.length > 10;
    },
    unique: true
  }
},
  { collection: 'categories' }
);

mongoose.models = {};

var Category = mongoose.model('Category', category);

export default Category;
