class HomeController {
  async index(req, res) {
    return res.json({
      Titulo: 'Home Index',
    });
  }
}

export default new HomeController();
