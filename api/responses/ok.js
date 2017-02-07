module.exports = (req, res) => (data) => {
  res.status(200);
  res.json({
    status: 'success',
    data,
  });
};
