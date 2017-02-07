module.exports = (req, res) => (data) => {
  res.status(400);
  console.log(data);
  res.send({
    status: 'fail',
    data,
  });
};
