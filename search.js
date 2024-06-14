document.addEventListener("DOMContentLoaded", function () {
    const pages = [
        { url: "bbang.html", title: "건강한빵" },
        { url: "burgerpark.html", title: "버거파크" },
        { url: "phobo.html", title: "포보" },
        { url: "pizzeriao.html", title: "핏제리아오" },
        { url: "sundae.html", title: "순대실록" },
    ];

    async function fetchPageContent(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        return await response.text();
    }

    function extractContentFromHTML(htmlString, className) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, "text/html");
        const contentElements = doc.getElementsByClassName(className);
        let content = "";
        for (let element of contentElements) {
            content += element.textContent + " ";
        }
        return content.trim();
    }

    async function search() {
        const query = document.getElementById("searchInput").value.toLowerCase();
        const resultsContainer = document.getElementById("results");
        resultsContainer.innerHTML = ""; // Clear previous results

        let results = [];

        for (let page of pages) {
            try {
                const content = await fetchPageContent(page.url);
                const extractedContent = extractContentFromHTML(content, "content");
                if (extractedContent.toLowerCase().includes(query)) {
                    results.push({ url: page.url, title: page.title });
                }
            } catch (error) {
                console.error("Failed to fetch page content: ", error);
            }
        }

        if (results.length > 0) {
            results.forEach((result) => {
                const resultItem = document.createElement("div");
                resultItem.classList.add("result-item");
                resultItem.innerHTML = `<h3><a href="${result.url}" target="_blank">${result.title}</a></h3>`;
                resultsContainer.appendChild(resultItem);
            });
        } else {
            resultsContainer.innerHTML = "<p>검색 결과가 없습니다.</p>";
        }
    }
    function randomRecommend() {
        const randomIndex = Math.floor(Math.random() * pages.length);
        const randomPage = pages[randomIndex];
        window.open(randomPage.url, "_blank");
    }

    // 검색 버튼 클릭 이벤트 연결
    document.getElementById("searchButton").addEventListener("click", search);
    document.getElementById("randomButton").addEventListener("click", randomRecommend);
});
