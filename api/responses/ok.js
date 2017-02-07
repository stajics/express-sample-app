module.exports = (req, res) => (data = {}) => {
  res.status(200);
  res.json(data);
};
