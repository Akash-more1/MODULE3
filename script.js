document.addEventListener('DOMContentLoaded', () => {
    const apiURL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';
    let data = [];

    // Fetch data using .then
    function fetchDataWithThen() {
        fetch(apiURL)
            .then(response => response.json())
            .then(apiData => {
                data = apiData;
                renderTable(data);
            })
            .catch(error => console.error('Error fetching data with .then:', error));
    }

    // Fetch data using async/await
    async function fetchDataWithAsyncAwait() {
        try {
            const response = await fetch(apiURL);
            const apiData = await response.json();
            data = apiData;
            renderTable(data);
        } catch (error) {
            console.error('Error fetching data with async/await:', error);
        }
    }

    // Render data in the table
    function renderTable(data) {
        const tableBody = document.getElementById('cryptoTableBody');
        tableBody.innerHTML = '';

        data.forEach(crypto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${crypto.image}" alt="${crypto.name}" width="20"> ${crypto.name}</td>
                <td>${crypto.symbol.toUpperCase()}</td>
                <td>$${crypto.current_price.toLocaleString()}</td>
                <td>${crypto.total_volume.toLocaleString()}</td>
                <td>$${crypto.market_cap.toLocaleString()}</td>
                <td>${crypto.price_change_percentage_24h.toFixed(2)}%</td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Search functionality
    document.getElementById('searchInput').addEventListener('input', function() {
        const searchValue = this.value.toLowerCase();
        const filteredData = data.filter(crypto => 
            crypto.name.toLowerCase().includes(searchValue) ||
            crypto.symbol.toLowerCase().includes(searchValue)
        );
        renderTable(filteredData);
    });

    // Sort functionality
    document.getElementById('sortMarketCap').addEventListener('click', () => {
        const sortedData = [...data].sort((a, b) => b.market_cap - a.market_cap);
        renderTable(sortedData);
    });

    document.getElementById('sortChange').addEventListener('click', () => {
        const sortedData = [...data].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
        renderTable(sortedData);
    });

    // Initially fetch data using async/await
    fetchDataWithAsyncAwait();
});
