const stockData = [{
  "symbol": "MSFT",
  "open": "182.8450",
  "high": "185.6300",
  "low": "182.4800",
  "price": "183.8900",
  "volume": "33529074",
  "latest_trading_day": "2020-02-07",
  "previous_close": "183.6300",
  "change": "0.2600",
  "change_percent": "0.1416%"
}, {
  "symbol": "AAPL",
  "open": "322.3700",
  "high": "323.4000",
  "low": "318.0000",
  "price": "320.0300",
  "volume": "29421012",
  "latest_trading_day": "2020-02-07",
  "previous_close": "325.2100",
  "change": "-5.1800",
  "change_percent": "-1.5928%"
}, {
  "symbol": "GOOG",
  "open": "1467.3000",
  "high": "1485.8400",
  "low": "1466.3500",
  "price": "1479.2300",
  "volume": "1172270",
  "latest_trading_day": "2020-02-07",
  "previous_close": "1476.2300",
  "change": "3.0000",
  "change_percent": "0.2032%"
}];


function changeGrowthPresentation(el){
  el.dataset.displayRelative = !(el.dataset.displayRelative === 'true');
  if(el.dataset.displayRelative === 'true')
    el.innerHTML = el.dataset.changeRelative;
  else
    el.innerHTML = el.dataset.change;
}

const addCompaniesToList = ( companies ) => {
  const companiesList = document.getElementsByClassName('companiesList')[0];
  const fragment = document.createDocumentFragment();

  companies.forEach(company => {
    if(!company.change) return;
    const companyContainer = document.createElement("li");
    companyContainer.className = "companyContainer";

    const growthButtonClasses = "stockGain" + (company.changePercent < 0 ? ' negative' : '');
    const growthSign = company.changePercent >= 0 ? '+' : '';
    const absoluteChange = growthSign + company.change.toFixed(2);
    const relativeChange = growthSign + company.changePercent.toFixed(2) + '%';

    companyContainer.innerHTML = `<span class="companyName">${company.symbol + ` (${company.companyName})`}</span>
                                  <div class="companyInfoContainer">
                                    <span class="stockPrice">${company.price.toFixed(2)}</span>
                                    <button class="${growthButtonClasses}" data-change="${absoluteChange}" 
                                    data-change-relative="${relativeChange}" data-display-relative="true">${relativeChange}</button>
                                  </div>`;
    fragment.appendChild(companyContainer);
  });

  companiesList.appendChild(fragment);
};

async function loadStocks(companies){
  const url = 'http://127.0.0.1:3000/api/v1/prices?company=' + companies.join(',');
  const response = await fetch(url);
  if(response.ok){
    const stockData = await response.json();
    addCompaniesToList(stockData);
  }
}
/*
const addCompaniesToList = ( companies ) => {
  const companiesList = document.getElementsByClassName('companiesList')[0];
  companies.forEach(company => {
    const companyContainer = document.createElement("li");
    companyContainer.className = "companyContainer";
    const growthSign = company.change_percent[0]==='-' ? '' : '+';
    companyContainer.innerHTML = `<span class="companyName">${company.symbol}</span>
                                  <div class="companyInfoContainer">
                                    <span class="stockPrice">${ company.price}</span>
                                    <button class="stockGain">${growthSign + company.change_percent}</button>
                                  </div>`;
    companiesList.appendChild(companyContainer);
  });
};*/
window.onload = () => {
  const companiesQueryList = ['WIX', 'BMW', 'AMZN', 'TSLA', 'AAPL', 'FACEBOOK', 'GOOGL', 'MSFT', 'asdfqw'];

  const companiesList = document.querySelector('.companiesList');
  companiesList.addEventListener("click", (e) => {
    const target = e.target;
    if(target.classList.contains('stockGain'))
      changeGrowthPresentation(target);
  });
  loadStocks(companiesQueryList);
};

