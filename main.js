fetch('https://restcountries.com/v3.1/all')
.then(res => res.json())
.then(data => addCountry(data))

const popUp = document.getElementById('pop-up');
const tBody = document.querySelector('tbody')
const cencel = ()=>{
    popUp.classList.remove('active')
}

  function addCountry(data){
    document.getElementById('total').innerText = data.length
    const num = data
    data.forEach( data => {
        const tr = document.createElement('tr'),
        tdSi = document.createElement('td'),
        tdCountry = document.createElement('td'),
        tdPopu = document.createElement('td'),
        tdImg = document.createElement('td'),
        tdArea = document.createElement('td'),
        img = document.createElement('img')

        tdSi.innerText = num.indexOf(data) +1;
        tdCountry.setAttribute('onclick', `getDetails('${data.name.common}')`);
        tdCountry.innerText = data.name.common;
        tdPopu.innerText = data.population;
        img.setAttribute('src', data.flags.png)
        tdImg.appendChild(img);
        tdArea.innerHTML = data.area

        tr.appendChild(tdSi)
        tr.appendChild(tdCountry)
        tr.appendChild(tdPopu)
        tr.appendChild(tdImg)
        tr.appendChild(tdArea)

        tBody.append(tr)
    });
  }

function getDetails(name){
    fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(res=>res.json())
    .then(data => showDetail(data))
  }

const showDetail = data =>{
    const detailBox = document.getElementById('details');
    document.querySelector('#pop-up img').src = data[0].flags.png
    document.querySelector('#pop-up h2').innerText = data[0].name.common
    let status;
    if(data[0].independent === true){
            status ='yes'
    }else{
        status ='No'
    }
    detailBox.innerHTML = `
                <li>Name: ${data[0].name.common}</li>
                <li>Official Name: ${data[0].name.official}</li>
                <li>Symbol: ${data[0].altSpellings[0]}</li>
                <li>Population: ${data[0].population}</li>
                <li>Languages: ${data[0].languages.spa}</li>
                <li>Time-Zone: ${data[0].timezones[0]}</li>
                <li>Capital: ${data[0].capital[0]}</li>
                <li> independent: ${status}</li>`
                popUp.classList.add('active')
}