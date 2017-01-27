console.log('Models index.js file being hit!');
module.exports = {
  user: require('./User.js'),
  movie: require('./Movie.js'),
  favorite: require('./Favorite.js')
};
