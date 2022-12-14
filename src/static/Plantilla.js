import React from "react";
import "../App.css";
import houseImgPath from "../img/logo.png";
import carrito from "../img/cart.svg";
import userIcon from "../img/userIcon.svg";
import menuIcon from "../img/icons8-menu.svg";

async function getUser() {
  //let  r= await fetchIP();
  //la ip
  let data = localStorage.getItem("ipAdress");

  if (localStorage.getItem(data) != null) {
    let json = JSON.parse(localStorage.getItem(data));

    return json.nombre + " " + json.apellido;
  }
  return "";
}
async function getCanCart() {
  if (localStorage.getItem("Products") != null) {
    var products = JSON.parse(localStorage.getItem("Products")) || [];
    let cant = 0;
    for (let i = 0; i < products.length; i++) {
      cant += products[i].cantidad;
    }
    if (cant == 0) {
      return "";
    }
    return cant;
  }
  return "";
}
function getCartSize() {
  if (localStorage.getItem("Products") != null) {
    var products = JSON.parse(localStorage.getItem("Products")) || [];
    let cant = 0;
    for (let i = 0; i < products.length; i++) {
      cant += products[i].cantidad;
    }
    if (cant == 0) {
      return "";
    }
    return cant;
  }
  return "";
}

class Plantilla extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sectionToDisplay: [],
      user: "",
      cantCart: "",
    };
  }

  componentDidUpdate() {
    console.log(this.state.cantCart, getCartSize());
    if (this.state.cantCart !== getCartSize()) {
      this.setState({ cantCart: getCartSize() });
    }
  }

  productOrders = () => {};

  componentDidMount() {
    getUser().then((data) => this.setState({ user: data }));
  }
  logout = (e) => {
    setTimeout(() => {
      localStorage.removeItem("ipAdress");
      this.setState({ user: "" });
    });
  };

  render() {
    let ip = localStorage.getItem("ipAdress") || "false";
    let user = localStorage.getItem(ip) || "{}";
    let userj = JSON.parse(user);
    let rol = userj.rol;

    return (
      <body
        style={{ minWidth: "100%" }}
        className=" overflow-auto coverContainer backgroundNavbar"
      >
        <div>
          {/*El minWidth se pone para que los divs cubran todo el ancho de la pantalla*/}
          {/*En el siguiente bloque nav se habilita los enlaces de las funcionalidades de la aplicación, como el inicio de sesión, carrito, tienda, etc.*/}
          <nav className="navbar  navbar-expand-sm color-nav">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a
                  height="10"
                  className=" btn btn-outline-dark bg-dark text-dark nav-link "
                  href="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img src={menuIcon} alt="logo" width="30" height="20" />
                </a>

                {/* HamburguerMenu desplegable en la esquina superior izquierda de la pantalla*/}
                <ul className="dropdown-menu bg-dark ">
                  <li>
                    <a className="dropdown-item text-white" href="/Catalogo">
                      Catálogo
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item text-white outline "
                      href="/AnunciosPromociones"
                    >
                      Publicar Anuncio{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item text-white"
                      href="/bannerPromociones"
                    >
                      Publicar Banner
                    </a>
                  </li>

                  {/* Opcion de menú para ingresar al formulario de contacto */}
                  <li>
                    <a
                      className="dropdown-item text-white"
                      href="/FormularioContacto"
                    >
                      Formulario de Contacto
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item text-white" href="/PyR">
                      Preguntas y respuestas
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                </ul>
              </li>
              <li style={{ opacity: 0 }}>-</li>
              <li className="navbar-item">
                <a href="/" className="navbar-brand text-dark">
                  <img src={houseImgPath} width="30" height="30" /> Kfashion
                </a>
              </li>
            </ul>
            <div className="bg-dark">
              <ul className="navbar-nav mr-auto"></ul>
            </div>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto ms-1">
                <li className="nav-item dropdown">
                  <a
                    height="20"
                    className=" btn btn-outline-dark bg-white text-dark nav-link dropdown-toggle"
                    href="/"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {this.state.user !== "" ? (
                      <a
                        href="/Carrito"
                        className="btn btn-default  btn-outline-dark bg-white text-dark "
                      >
                        {" "}
                        {this.state.user}
                        <img
                          src={userIcon}
                          alt="logo"
                          width="30"
                          height="20"
                        ></img>
                      </a>
                    ) : (
                      <img src={userIcon} alt="logo" width="30" height="20" />
                    )}
                  </a>
                  <ul className="dropdown-menu bg-dark">
                    {this.state.user !== "" ? (
                      <div>
                        <li>
                          <a
                            className="dropdown-item text-white outline "
                            href="/Perfil"
                          >
                            Perfil
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item text-white"
                            href="/Orders"
                          >
                            Ver mis órdenes de compra
                          </a>
                        </li>

                        {rol == "EMP" ? (
                          <div>
                            <li>
                              <a
                                className="dropdown-item text-white"
                                href="/Productos"
                              >
                                Gestionar Productos
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item text-white"
                                href="/Promociones"
                              >
                                Gestionar Promociones
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item text-white"
                                href="/Ofertas"
                              >
                                Gestionar Ofertas
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item text-white"
                                href="/CancelarFactura"
                              >
                                Cancelar Facturas
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item text-white"
                                href="/Reporte"
                              >
                                Reporte de ventas
                              </a>
                            </li>
                            <li>
                              <hr className="dropdown-divider" />
                            </li>
                            <li>
                              <a
                                onClick={this.logout}
                                className="dropdown-item text-white"
                                href="/"
                              >
                                Cerrar Sesión
                              </a>
                            </li>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    ) : (
                      <div>
                        <li>
                          <a className="dropdown-item text-white" href="/Login">
                            Iniciar Sesión
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item text-white"
                            href="/Register"
                          >
                            Registrarse
                          </a>
                        </li>
                      </div>
                    )}
                  </ul>
                </li>
                <li style={{ opacity: 0 }}>-</li>
                <li className="nav-item">
                  <a
                    style={{ minHeight: "72%", maxHeight: "90%" }}
                    href="/Carrito"
                    class="btn btn-default  btn-outline-dark bg-white text-dark "
                  >
                    {" "}
                    Carrito
                    <img src={carrito} alt="logo" width="30" height="25" />
                    {this.state.cantCart !== "" ? (
                      <div class="position-relative">
                        <p
                          style={{
                            marginLeft: "23%",
                            maxHeight: "4%",
                            maxWidth: "40%",
                          }}
                          class="bg-dark text-white"
                        >
                          {" "}
                          {this.state.cantCart}
                        </p>
                      </div>
                    ) : (
                      <></>
                    )}
                  </a>
                </li>
                <li style={{ opacity: 0 }}>-</li>
              </ul>
            </div>
          </nav>
        </div>

        {this.props.sectionToDisplay}

        <footer className="color-nav text-white  text-center  position-relative sticky-bottom">
          <div className="container p-0">
            <div className="row">
              <div className="col-lg-6 col-md-6 mb-4 mb-md-0">
                <ul className="list-unstyled mb-0">
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>

              <div className="col-lg-6 col-md-6 mb-4 mb-md-0">
                <ul className="list-unstyled">
                  <li></li>
                  <li></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </body>
    );
  }
}

export default Plantilla;
