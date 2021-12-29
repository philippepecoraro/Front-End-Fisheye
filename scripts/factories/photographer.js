export default function photographerFactory(data) {
  const { name, id, city, country, tagline, price, portrait } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement('article');

    const a = document.createElement('a');

    a.href = `photographer.html?id=${id}`;

    const img = document.createElement('img');
    const picture1 = picture.slice(0, -4);
    img.setAttribute("src", `${picture1}.png`);

    const h2 = document.createElement('h2');
    h2.textContent = name;

    const div1 = document.createElement('div');
    div1.className = "location";
    div1.innerHTML = `<p>${city}, ${country}</p>`;

    const p2 = document.createElement('p');
    p2.textContent = tagline;

    const div = document.createElement('div');
    div.className = "pricePerDay";
    div.innerHTML = `<p>${price}€/jour</p>`;

    article.appendChild(a);
    a.appendChild(img);
    a.appendChild(h2);
    article.appendChild(div1);
    article.appendChild(p2);
    article.appendChild(div);

    return (article);
  }
  return { getUserCardDOM }
}