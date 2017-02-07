module.exports = (req, res) => (data) => {
  res.status(401);
  console.log(data);
  res.json({
    status: 'fail',
    data: data || {
      message: 'Unauthorized request.',
    },
  });
};
