import 'bootstrap/dist/css/bootstrap.min.css';
const Header = () => { 
    return (
        <body>
    <header>      
        <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow">
            <div class="container-fluid">
                <a class="navbar-brand" asp-area="" asp-controller="Home" asp-action="Index">HOTEL</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div>
                    <ul class="navbar-nav ">
                        <li class="nav-item ">
                            <a class="nav-link text-dark" >Главная</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-dark" >Ремонт оргтехники</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-dark" >Заправка катриджей</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-dark" >Доставка и оплата</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    </body>
    );
};

export default Header; 