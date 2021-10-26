const HtmlResponse = document.querySelector("#app");
fetch("https://genius.p.rapidapi.com/search?q=Lofis", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "genius.p.rapidapi.com",
		"x-rapidapi-key": "634f32e93fmsh084184834fbb8f5p1f6761jsn774df2b2397d"
	}
})
.then(res => res.json())
.then(data => {
	const lofis = data.response.hits;
	const tlp = lofis.map((lofi) => 
	`
	<div>
	<img src="${lofi.result.song_art_image_url}" alt="News 1">
	<h3>${lofi.result.title}</h3>
	<p>por: ${lofi.result.primary_artist.name}</p>
	<a href="${lofi.result.url}">leer más <i class="fas fa-angle-double-right"></i></a>
	</div>
	
	`).join('');
	
	HtmlResponse.innerHTML = tlp;
	
})