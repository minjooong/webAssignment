document.addEventListener("DOMContentLoaded", function () {
    const headerHtml = `
        <header>
            <div class="topnav">
                <h1 id="header-title">우 맛</h1>
                <a href="./home.html">Home</a>
                <a href="./pizza.html">Menu</a>
                <a href="./pizzeriao.html">Restaurant</a>
            </div>
        </header>
        <div class="headerline">WELCOME TO MY WEB PROGRAMMING ASSIGNMENT</div>
    `;
    const footerHtml = `
        <footer>
            © 2024 웹 프로그래밍 과제  <img src="./logo.png" alt="skku" />
        </footer>
    `;

    document.body.insertAdjacentHTML("afterbegin", headerHtml);
    document.body.insertAdjacentHTML("beforeend", footerHtml);

    document.getElementById("header-title").addEventListener("click", function () {
        window.location.href = "./index.html";
    });
});
