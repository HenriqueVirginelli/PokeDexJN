
let isShiny = false;
let currentSprites = {
  normal: "",
  shiny: ""
}

function getPokemon(event) {
    event.preventDefault()

    let input = document.getElementById("pokemonSearch")
    let name = document.getElementById("pokemonTitle")
    let dex = document.getElementById("dexNumber")
    let imageSrcFrontDefault = document.getElementById("pokemonImageFrontDefault")
    let imageSrcFrontShiny = document.getElementById("pokemonImageFrontShiny")
    let imageSrcFrontDefaultFemale = document.getElementById("pokemonImageFrontDefaultFemale")
    let imageSrcFrontShinyFemale = document.getElementById("pokemonImageFrontShinyFemale")
    let atk = document.getElementById("atk") 
    let spAtk = document.getElementById("spAtk")
    let hp = document.getElementById("hp")
    let speed = document.getElementById("speed")
    let def = document.getElementById("def")
    let spDef = document.getElementById("spDef")
    let ability = document.getElementById("ability")
    let hiddenAbility = document.getElementById("hiddenAbility")
    let pokemonType = document.getElementById("pokemonType")
    let pokemonType1 = document.getElementById("pokemonType1")
    let soundCryLegacy = document.getElementById("soundCryLegacy")
    let playSoundLegacy = document.getElementById("playSoundLegacy")
    let soundCryLatest = document.getElementById("soundCryLatest")
    let playSoundLatest = document.getElementById("playSoundLatest")
    const pokemon = input.value.toLowerCase().trim()

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then(response => {
        return response.json()
    })

    .then(data => { 

        function renderStats(data) {
            setStatBar("hp", data.stats[0].base_stat);
            setStatBar("atk", data.stats[1].base_stat);
            setStatBar("def", data.stats[2].base_stat);
            setStatBar("spAtk", data.stats[3].base_stat);
            setStatBar("spDef", data.stats[4].base_stat);
            setStatBar("speed", data.stats[5].base_stat);
          }
          
          function setStatBar(id, value) {
            const max = 255;
            const percent = (value / max) * 100;
            const el = document.getElementById(id);
          
            if (el) {
              el.style.width = `${percent}%`;
              el.classList.remove("low", "high");
              el.classList.add(value >= 100 ? "high" : "low");
              el.textContent = value; // opcional: mostra o número dentro da barra
            }
          }  
          
        renderStats(data)
        let normalSprite = data.sprites.front_default
        let shinySprite = data.sprites.front_shiny

        currentSprites.normal = normalSprite
        currentSprites.shiny = shinySprite
        isShiny = false
        
        let imagemAlternando = document.getElementById("pokemonSprite")
        imagemAlternando.src = currentSprites.normal
        imagemAlternando.onclick = () => {
            isShiny = !isShiny
            imagemAlternando.src = isShiny ? currentSprites.shiny : currentSprites.normal

            if (isShiny) triggerSparks();
            if (isShiny) soundCryLatest.play()
           

            function triggerSparks() {
                const sparkContainer = document.getElementById("sparkEffect");
                sparkContainer.innerHTML = '';
                sparkContainer.style.display = 'block';
              
                for (let i = 0; i < 20; i++) {
                  const spark = document.createElement('div');
                  spark.classList.add('spark');
              
                  const angle = Math.random() * 2 * Math.PI;
                  const distance = Math.random() * 60 + 20;
                  const x = Math.cos(angle) * distance;
                  const y = Math.sin(angle) * distance;
              
                  spark.style.setProperty('--x', `${x}px`);
                  spark.style.setProperty('--y', `${y}px`);
              
                  sparkContainer.appendChild(spark);
                }
              
                setTimeout(() => {
                  sparkContainer.style.display = 'none';
                }, 1000)}

        }

        if (data.sprites.front_default !== null) {
            document.getElementById("imagensMale").style.display = "block"
        } else {
            document.getElementById("imagensMale").style.display = "none"
        }
        
        if (data.sprites.front_female !== null) {
            imageSrcFrontDefaultFemale.src = data.sprites.front_female
            imageSrcFrontShinyFemale.src = data.sprites.front_shiny_female
            document.getElementById("imagensFemale").style.display = "block"
        } else {
            document.getElementById("imagensFemale").style.display = "none"
        }

        if (data.types[1] == undefined) {
            pokemonType1.innerText = ""
        } else {
            pokemonType1.innerText = data.types[1].type.name
        }

        if (data.cries.legacy !== null) {
            soundCryLegacy.src = data.cries.legacy
            document.getElementById("criesLegacy").style.display ="block"
        } else {
            document.getElementById("criesLegacy").style.display ="none"
        }

        if (data.abilities[1] !== undefined) {
            hiddenAbility.innerText = data.abilities[1].ability.name
            document.getElementById("hiddenAbilityBlock").style.display ="block"
        } else {
            document.getElementById("hiddenAbilityBlock").style.display ="none"
        }

        if (data.types[0] !== undefined) {
            document.getElementById("type").style.display ="block"
        }

        
    
       

        soundCryLegacy.volume = 0.3
        playSoundLegacy.onclick = () => {
            soundCryLegacy.play()
        }
        soundCryLatest.src = data.cries.latest
        soundCryLatest.volume = 0.3
        playSoundLatest.onclick = () => {
            soundCryLatest.play() 
        }

        name.innerHTML = data.name
        
        hp.innerText = data.stats[0].base_stat
        atk.innerText = data.stats[1].base_stat
        def.innerText = data.stats[2].base_stat
        spAtk.innerText = data.stats[3].base_stat
        spDef.innerText = data.stats[4].base_stat
        speed.innerText = data.stats[5].base_stat
        ability.innerText = data.abilities[0].ability.name
        pokemonType.innerText = data.types[0].type.name       
        dex.innerText = data.order 

        const spriteContainer = document.getElementById("typeContainer");

        spriteContainer.className = "sprite-container";

        const primaryType = data.types[0].type.name.toLowerCase();
        spriteContainer.classList.add(`type-${primaryType}`);
        
        
        const hoverBox = document.getElementById("pokemonHover");

// Detectar posição do mouse na janela
document.addEventListener("mousemove", (event) => {
  const windowHeight = window.innerHeight;
  const triggerZone = 400; // Quantos pixels do fim da tela ativa o hover

  if (windowHeight - event.clientY < triggerZone) {
    hoverBox.classList.add("active");
  } else {
    hoverBox.classList.remove("active");

   

  }
});
    }  
) 
}
