            let slideIndex = 0;
            const track = document.querySelector('.carousel-track');
            const slides = Array.from(track.children);
            const slideWidth = slides[0].getBoundingClientRect().width;

            function updateCarousel() {
                track.style.transform = 'translateX(' + (-slideIndex * slideWidth) + 'px)';
                const dots = document.getElementsByClassName("dot");
                for (let i = 0; i < dots.length; i++) {
                    dots[i].className = dots[i].className.replace(" active", "");
                }
                dots[slideIndex].className += " active";
            }

            function showSlide(n) {
                slideIndex = n;
                if (slideIndex >= slides.length) slideIndex = 0;
                if (slideIndex < 0) slideIndex = slides.length - 1;
                updateCarousel();
            }

            function nextSlide() {
                slideIndex++;
                if (slideIndex >= slides.length) slideIndex = 0;
                updateCarousel();
            }

            function prevSlide() {
                slideIndex--;
                if (slideIndex < 0) slideIndex = slides.length - 1;
                updateCarousel();
            }

            // Assign functions to window object to be accessible from HTML
            window.showSlide = showSlide;
            window.nextSlide = nextSlide;
            window.prevSlide = prevSlide;

            // Initial setup
            updateCarousel();
            
            // --- DYNAMIC COUNTERS ---
            // Countdown Timer
            const countdownElement = document.getElementById('countdown-timer');
            let timeInSeconds = (2 * 3600) + (15 * 60) + 48;

            setInterval(() => {
                timeInSeconds--;
                const hours = Math.floor(timeInSeconds / 3600);
                const minutes = Math.floor((timeInSeconds % 3600) / 60);
                const seconds = timeInSeconds % 60;
                countdownElement.innerHTML = `<i class="fa-solid fa-fire-flame-curved"></i> ¡Oferta termina en ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}!`;
            }, 1000);

            // People Watching
            const peopleElement = document.getElementById('people-watching');
            let currentPeople = 28;
            setInterval(() => {
                const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
                currentPeople = Math.max(15, currentPeople + change); // Keep it above 15
                peopleElement.textContent = currentPeople;
            }, 3500);


            // --- Accordion Logic ---
            const accordionHeaders = document.querySelectorAll('.accordion-header');
            accordionHeaders.forEach(header => {
                header.addEventListener('click', () => {
                    const content = header.nextElementSibling;
                    const icon = header.querySelector('span:last-child');
                    
                    if (content.style.maxHeight) {
                        content.style.maxHeight = null;
                        icon.textContent = '+';
                    } else {
                        content.style.maxHeight = content.scrollHeight + "px";
                        icon.textContent = '-';
                    }
                });
            });

            // --- General Modal Logic ---
            function setupModal(openBtnId, modalId, closeBtnId) {
                const openBtn = document.getElementById(openBtnId);
                const modal = document.getElementById(modalId);
                const closeBtn = document.getElementById(closeBtnId);

                if(openBtn && modal && closeBtn) {
                    openBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        modal.classList.add('active');
                    });

                    closeBtn.addEventListener('click', () => {
                        modal.classList.remove('active');
                    });

                    modal.addEventListener('click', (e) => {
                        if (e.target === modal) {
                            modal.classList.remove('active');
                        }
                    });
                }
            }

            // Setup both modals
            setupModal('buy-button', 'checkout-modal', 'close-checkout-modal');
            setupModal('view-all-reviews-link', 'reviews-modal', 'close-reviews-modal');


            // --- Reviews Modal Population ---
            const reviewsData = {
              "reviews": [
                {"id": 1, "username": "Alfredo_D", "rating": 5, "date": "2025-04-11", "comment": "Hola, recién recibí el paquete que era muy rápido, excelente producto, alta calidad. Realmente lo aprecio. Muchas gracias. Exactamente como lo prescribes, es asombroso que realmente es.", "helpful_count": 0, "verified_purchase": true, "product_variant": {"type": "Color", "value": "Stand With BT"}},
                {"id": 2, "username": "Noemi_I", "rating": 5, "date": "2025-06-28", "comment": "Se ajusta a la descripción, buena calidad, el embalaje está bien.", "helpful_count": 0, "verified_purchase": true, "product_variant": {"type": "Color", "value": "Stand With BT"}},
                {"id": 3, "username": "Santiago_I", "rating": 5, "date": "2025-03-29", "comment": "El producto es bueno, coincide con la descripción y el precio, el sonido es mediano, juega bien para un sonido completo, el magnético es débil, tiene luz nocturna, cargador de teléfono.", "helpful_count": 0, "verified_purchase": true, "product_variant": {"type": "Color", "value": "Stand With BT"}},
                {"id": 4, "username": "sanchez_perez", "rating": 5, "date": "2025-07-04", "comment": "Excelente, permite sostener y usar los auriculares al mismo tiempo.", "helpful_count": 0, "verified_purchase": true, "product_variant": {"type": "Color", "value": "Stand With BT"}},
                {"id": 5, "username": "Carlos_H", "rating": 5, "date": "2025-03-12", "comment": "me gusta", "helpful_count": 1, "verified_purchase": true, "product_variant": {"type": "Color", "value": "Stand With BT"}},
                {"id": 6, "username": "Comprador_Mex", "rating": 4, "date": null, "comment": "Esta padrisimo la bocina el único detalle es el manual no viene en español ahora tengo que buscar el traductor en Google para programar de ahí en fuera esta excelente el producto y precio, gracias", "helpful_count": null, "verified_purchase": true, "product_variant": null}
              ]
            };

            const viewAllReviewsLink = document.getElementById('view-all-reviews-link');
            const reviewsListContainer = document.getElementById('reviews-list');

            function generateStars(rating) {
                if (rating === null || rating === undefined) return '<span>Sin calificación</span>';
                let stars = '';
                for(let i = 0; i < 5; i++) {
                    stars += i < rating ? '<i class="fa-solid fa-star"></i>' : '<i class="fa-regular fa-star"></i>';
                }
                return stars;
            }

            viewAllReviewsLink.addEventListener('click', () => {
                reviewsListContainer.innerHTML = ''; // Clear old reviews
                reviewsData.reviews.forEach(review => {
                    const reviewElement = document.createElement('div');
                    reviewElement.className = 'review-item';
                    reviewElement.innerHTML = `
                        <div class="review-header">
                            <span class="username">${review.username}</span>
                            <span class="date">${review.date || 'Fecha no disponible'}</span>
                        </div>
                        <div class="review-rating">${generateStars(review.rating)}</div>
                        <p class="review-comment">${review.comment}</p>
                    `;
                    reviewsListContainer.appendChild(reviewElement);
                });
            });


            // --- Form and Location Logic ---
            const departamentosCiudades = {
              "Amazonas": ["El Encanto","La Chorrera","La Pedrera","La Victoria","Leticia","Mirití-Paraná","Puerto Alegría","Puerto Arica","Puerto Nariño","Puerto Santander","Tarapacá"],
              "Antioquia": ["Abejorral","Abriaquí","Alejandría","Amagá","Amalfi","Andes","Angelópolis","Angostura","Anorí","Anzá","Apartadó","Arboletes","Argelia","Armenia","Barbosa","Bello","Belmira","Betania","Betulia","Briceño","Buriticá","Cáceres","Caicedo","Caldas","Campamento","Cañasgordas","Caracolí","Caramanta","Carepa","Carolina del Príncipe","Caucasia","Chigorodó","Cisneros","Ciudad Bolívar","Cocorná","Concepción","Concordia","Copacabana","Dabeiba","Donmatías","Ebéjico","El Bagre","El Carmen de Viboral","El Peñol","El Retiro","El Santuario","Entrerríos","Envigado","Fredonia","Frontino","Giraldo","Girardota","Gómez Plata","Granada","Guadalupe","Guarne","Guatapé","Heliconia","Hispania","Itagüí","Ituango","Jardín","Jericó","La Ceja","La Estrella","La Pintada","La Unión","Liborina","Maceo","Marinilla","Medellín","Montebello","Murindó","Mutatá","Nariño","Nechí","Necoclí","Olaya","Peque","Pueblorrico","Puerto Berrío","Puerto Nare","Puerto Triunfo","Remedios","Rionegro","Sabanalarga","Sabaneta","Salgar","San Andrés de Cuerquia","San Carlos","San Francisco","San Jerónimo","San José de la Montaña","San Juan de Urabá","San Luis","San Pedro de Urabá","San Pedro de los Milagros","San Rafael","San Roque","San Vicente","Santa Bárbara","Santa Fe de Antioquia","Santa Rosa de Osos","Santo Domingo","Segovia","Sonsón","Sopetrán","Támesis","Tarazá","Tarso","Titiribí","Toledo","Turbo","Uramita","Urrao","Valdivia","Valparaíso","Vegachí","Venecia","Vigía del Fuerte","Yalí","Yarumal","Yolombó","Yondó","Zaragoza"],
              "Arauca": ["Arauca","Arauquita","Cravo Norte","Fortul","Puerto Rondón","Saravena","Tame"],
              "Atlántico": ["Baranoa","Barranquilla","Campo de la Cruz","Candelaria","Galapa","Juan de Acosta","Luruaco","Malambo","Manatí","Palmar de Varela","Piojó","Polonuevo","Ponedera","Puerto Colombia","Repelón","Sabanagrande","Sabanalarga","Santa Lucía","Santo Tomás","Soledad","Suán","Tubará","Usiacurí"],
              "Bolívar": ["Achí","Altos del Rosario","Arenal","Arjona","Arroyohondo","Barranco de Loba","Brazuelo de Papayal","Calamar","Cantagallo","Cartagena de Indias","Cicuco","Clemencia","Córdoba","El Carmen de Bolívar","El Guamo","El Peñón","Hatillo de Loba","Magangué","Mahates","Margarita","María La Baja","Mompós","Montecristo","Morales","Norosí","Pinillos","Regidor","Río Viejo","San Cristóbal","San Estanislao","San Fernando","San Jacinto","San Jacinto del Cauca","San Juan Nepomuceno","San Martín de Loba","San Pablo","Santa Catalina","Santa Rosa","Santa Rosa del Sur","Simití","Soplaviento","Talaigua Nuevo","Tiquisio","Turbaco","Turbaná","Villanueva","Zambrano"],
              "Boyacá": ["Almeida","Aquitania","Arcabuco","Belén","Berbeo","Betéitiva","Boavita","Boyacá","Briceño","Buenavista","Busbanzá","Caldas","Campohermoso","Cerinza","Chinavita","Chiquinquirá","Chíquiza","Chiscas","Chita","Chitaraque","Chivatá","Chivor","Ciénega","Combita","Coper","Corrales","Covarachía","Cubará","Cucaita","Cuítiva","Duitama","El Cocuy","El Espino","Firavitoba","Floresta","Gachantivá","Gámeza","Garagoa","Guacamayas","Guateque","Guayatá","Güicán","Iza","Jenesano","Jericó","La Capilla","La Uvita","La Victoria","Labranzagrande","Macanal","Maripí","Miraflores","Mongua","Monguí","Moniquirá","Motavita","Muzo","Nobsa","Nuevo Colón","Oicatá","Otanche","Pachavita","Páez","Paipa","Pajarito","Panqueba","Pauna","Paya","Paz de Río","Pesca","Pisba","Puerto Boyacá","Quípama","Ramiriquí","Ráquira","Rondón","Saboyá","Sáchica","Samacá","San Eduardo","San José de Pare","San Luis de Gaceno","San Mateo","San Miguel de Sema","San Pablo de Borbur","Santa María","Santa Rosa de Viterbo","Santa Sofía","Santana","Sativanorte","Sativasur","Siachoque","Soatá","Socha","Socotá","Sogamoso","Somondoco","Sora","Soracá","Sotaquirá","Susacón","Sutamarchán","Sutatenza","Tasco","Tenza","Tibaná","Tibasosa","Tinjacá","Tipacoque","Toca","Togüí","Tópaga","Tota","Tunja","Tununguá","Turmequé","Tuta","Tutazá","Úmbita","Ventaquemada","Villa de Leyva","Viracachá","Zetaquira"],
              "Caldas": ["Aguadas","Anserma","Aranzazu","Belalcázar","Chinchiná","Filadelfia","La Dorada","La Merced","Manizales","Manzanares","Marmato","Marquetalia","Marulanda","Neira","Norcasia","Pácora","Palestina","Pensilvania","Riosucio","Risaralda","Salamina","Samaná","San José","Supía","Victoria","Villamaría","Viterbo"],
              "Caquetá": ["Albania","Belén de los Andaquíes","Cartagena del Chairá","Curillo","El Doncello","El Paujil","Florencia","La Montañita","Milán","Morelia","Puerto Rico","San José del Fragua","San Vicente del Caguán","Solano","Solita","Valparaíso"],
              "Casanare": ["Aguazul","Chámeza","Hato Corozal","La Salina","Maní","Monterrey","Nunchía","Orocué","Paz de Ariporo","Pore","Recetor","Sabanalarga","Sácama","San Luis de Palenque","Támara","Tauramena","Trinidad","Villanueva","Yopal"],
              "Cauca": ["Almaguer","Argelia","Balboa","Bolívar","Buenos Aires","Cajibío","Caldono","Caloto","Corinto","El Tambo","Florencia","Guachené","Guapí","Inzá","Jambaló","La Sierra","La Vega","López de Micay","Mercaderes","Miranda","Morales","Padilla","Páez","Patía","Piamonte","Piendamó","Popayán","Puerto Tejada","Puracé","Rosas","San Sebastián","Santa Rosa","Santander de Quilichao","Silvia","Sotará","Suárez","Sucre","Timbío","Timbiquí","Toribío","Totoró","Villa Rica"],
              "Cesar": ["Aguachica","Agustín Codazzi","Astrea","Becerril","Bosconia","Chimichagua","Chiriguaná","Curumaní","El Copey","El Paso","Gamarra","González","La Gloria","La Jagua de Ibirico","La Paz","Manaure Balcón del Cesar","Pailitas","Pelaya","Pueblo Bello","Río de Oro","San Alberto","San Diego","San Martín","Tamalameque","Valledupar"],
              "Chocó": ["Acandí","Alto Baudó","Atrato","Bagadó","Bahía Solano","Bajo Baudó","Bojayá","Cértegui","Condoto","El Cantón del San Pablo","El Carmen de Atrato","El Carmen del Darién","Istmina","Juradó","Litoral del San Juan","Lloró","Medio Atrato","Medio Baudó","Medio San Juan","Nóvita","Nuquí","Quibdó","Río Iró","Río Quito","Riosucio","San José del Palmar","Sipí","Tadó","Unguía","Unión Panamericana"],
              "Cundinamarca": ["Agua de Dios","Albán","Anapoima","Anolaima","Apulo","Arbeláez","Beltrán","Bituima","Bogotá","Bojacá","Cabrera","Cachipay","Cajicá","Caparrapí","Cáqueza","Carmen de Carupa","Chaguaní","Chía","Chipaque","Choachí","Chocontá","Cogua","Cota","Cucunubá","El Colegio","El Peñón","El Rosal","Facatativá","Fómeque","Fosca","Funza","Fúquene","Fusagasugá","Gachalá","Gachancipá","Gachetá","Gama","Girardot","Granada","Guachetá","Guaduas","Guasca","Guataquí","Guatavita","Guayabal de Síquima","Guayabetal","Gutiérrez","Jerusalén","Junín","La Calera","La Mesa","La Palma","La Peña","La Vega","Lenguazaque","Machetá","Madrid","Manta","Medina","Mosquera","Nariño","Nemocón","Nilo","Nimaima","Nocaima","Pacho","Paime","Pandi","Paratebueno","Pasca","Puerto Salgar","Pulí","Quebradanegra","Quetame","Quipile","Ricaurte","San Antonio del Tequendama","San Bernardo","San Cayetano","San Francisco","San Juan de Rioseco","Sasaima","Sesquilé","Sibaté","Silvania","Simijaca","Soacha","Sopó","Subachoque","Suesca","Supatá","Susa","Sutatausa","Tabio","Tausa","Tena","Tenjo","Tibacuy","Tibirita","Tocaima","Tocancipá","Topaipí","Ubalá","Ubaque","Ubaté","Une","Útica","Venecia","Vergara","Vianí","Villagómez","Villapinzón","Villeta","Viotá","Yacopí","Zipacón","Zipaquirá"],
              "Córdoba": ["Ayapel","Buenavista","Canalete","Cereté","Chimá","Chinú","Ciénaga de Oro","Cotorra","La Apartada","Lorica","Los Córdobas","Momil","Montelíbano","Montería","Moñitos","Planeta Rica","Pueblo Nuevo","Puerto Escondido","Puerto Libertador","Purísima","Sahagún","San Andrés de Sotavento","San Antero","San Bernardo del Viento","San Carlos","San José de Uré","San Pelayo","Tierralta","Tuchín","Valencia"],
              "Guainía": ["Barrancominas","Cacahual","Inírida","La Guadalupe","Morichal","Pana Pana","Puerto Colombia","San Felipe"],
              "Guaviare": ["Calamar","El Retorno","Miraflores","San José del Guaviare"],
              "Huila": ["Acevedo","Agrado","Aipe","Algeciras","Altamira","Baraya","Campoalegre","Colombia","Elías","Garzón","Gigante","Guadalupe","Hobo","Íquira","Isnos","La Argentina","La Plata","Nátaga","Neiva","Oporapa","Paicol","Palermo","Palestina","Pital","Pitalito","Rivera","Saladoblanco","San Agustín","Santa María","Suaza","Tarqui","Tello","Teruel","Tesalia","Timaná","Villavieja","Yaguará"],
              "La Guajira": ["Albania","Barrancas","Dibulla","Distracción","El Molino","Fonseca","Hatonuevo","La Jagua del Pilar","Maicao","Manaure","Riohacha","San Juan del Cesar","Uribia","Urumita","Villanueva"],
              "Magdalena": ["Algarrobo","Aracataca","Ariguaní","Cerro de San Antonio","Chivolo","Ciénaga","Concordia","El Banco","El Piñón","El Retén","Fundación","Guamal","Nueva Granada","Pedraza","Pijiño del Carmen","Pivijay","Plato","Puebloviejo","Remolino","Sabanas de San Ángel","Salamina","San Sebastián de Buenavista","San Zenón","Santa Ana","Santa Bárbara de Pinto","Santa Marta","Sitionuevo","Tenerife","Zapayán","Zona Bananera"],
              "Meta": ["Acacías","Barranca de Upía","Cabuyaro","Castilla la Nueva","Cubarral","Cumaral","El Calvario","El Castillo","El Dorado","Fuente de Oro","Granada","Guamal","La Macarena","Lejanías","Mapiripán","Mesetas","Puerto Concordia","Puerto Gaitán","Puerto López","Puerto Lleras","Puerto Rico","Restrepo","San Carlos de Guaroa","San Juan de Arama","San Juanito","San Martín","Uribe","Villavicencio","Vista Hermosa"],
              "Nariño": ["Aldana","Ancuyá","Arboleda","Barbacoas","Belén","Buesaco","Chachagüí","Colón","Consacá","Contadero","Córdoba","Cuaspud","Cumbal","Cumbitara","El Charco","El Peñol","El Rosario","El Tablón de Gómez","El Tambo","Francisco Pizarro","Funes","Guachucal","Guaitarilla","Gualmatán","Iles","Imués","Ipiales","La Cruz","La Florida","La Llanada","La Tola","La Unión","Leiva","Linares","Los Andes","Magüí Payán","Mallama","Mosquera","Nariño","Olaya Herrera","Ospina","Pasto","Policarpa","Potosí","Providencia","Puerres","Pupiales","Ricaurte","Roberto Payán","Samaniego","San Bernardo","San Lorenzo","San Pablo","San Pedro de Cartago","Sandoná","Santa Bárbara","Santacruz","Sapuyes","Taminango","Tangua","Tumaco","Túquerres","Yacuanquer"],
              "Norte de Santander": ["Ábrego","Arboledas","Bochalema","Bucarasica","Cáchira","Cácota","Chinácota","Chitagá","Convención","Cúcuta","Cucutilla","Duranía","El Carmen","El Tarra","El Zulia","Gramalote","Hacarí","Herrán","La Esperanza","La Playa de Belén","Labateca","Los Patios","Lourdes","Mutiscua","Ocaña","Pamplona","Pamplonita","Puerto Santander","Ragonvalia","Salazar de Las Palmas","San Calixto","San Cayetano","Santiago","Sardinata","Silos","Teorama","Tibú","Toledo","Villa Caro","Villa del Rosario"],
              "Putumayo": ["Colón","Mocoa","Orito","Puerto Asís","Puerto Caicedo","Puerto Guzmán","Puerto Leguízamo","San Francisco","San Miguel","Santiago","Sibutadoy","Valle del Guamuez","Villagarzón"],
              "Quindío": ["Armenia","Buenavista","Calarcá","Circasia","Córdoba","Filandia","Génova","La Tebaida","Montenegro","Pijao","Quimbaya","Salento"],
              "Risaralda": ["Apía","Balboa","Belén de Umbría","Dosquebradas","Guática","La Celia","La Virginia","Marsella","Mistrató","Pereira","Pueblo Rico","Quinchía","Santa Rosa de Cabal","Santuario"],
              "San Andrés y Providencia": ["Providencia y Santa Catalina Islas","San Andrés"],
              "Santander": ["Aguada","Albania","Aratoca","Barbosa","Barichara","Barrancabermeja","Betulia","Bolívar","Bucaramanga","Cabrera","California","Capitanejo","Carcasí","Cepitá","Cerrito","Charalá","Charta","Chima","Chipatá","Cimitarra","Concepción","Confines","Contratación","Coromoro","Curití","El Carmen de Chucurí","El Guacamayo","El Peñón","El Playón","Encino","Enciso","Florián","Floridablanca","Galán","Gámbita","Girón","Guaca","Guadalupe","Guapotá","Guavatá","Güepsa","Hato","Jesús María","Jordán","La Belleza","La Paz","Landázuri","Lebríja","Los Santos","Macaravita","Málaga","Matanza","Mogotes","Molagavita","Ocamonte","Oiba","Onzaga","Palmar","Palmas del Socorro","Páramo","Piedecuesta","Pinchote","Puente Nacional","Puerto Parra","Puerto Wilches","Rionegro","Sabana de Torres","San Andrés","San Benito","San Gil","San Joaquín","San José de Miranda","San Miguel","San Vicente de Chucurí","Santa Bárbara","Santa Helena del Opón","Simacota","Socorro","Suaita","Sucre","Suratá","Tona","Valle de San José","Vélez","Vetas","Villanueva","Zapatoca"],
              "Sucre": ["Buenavista","Caimito","Chalán","Colosó","Corozal","Coveñas","El Roble","Galeras","Guaranda","La Unión","Los Palmitos","Majagual","Morroa","Ovejas","Palmito","Sampués","San Benito Abad","San Juan de Betulia","San Marcos","San Onofre","San Pedro","Sincé","Sincelejo","Sucre","Tolú","Tolúviejo"],
              "Tolima": ["Alpujarra","Alvarado","Ambalema","Anzoátegui","Armero","Ataco","Cajamarca","Carmen de Apicalá","Casabianca","Chaparral","Coello","Coyaima","Cunday","Dolores","El Espinal","Falan","Flandes","Fresno","Guamo","Herveo","Honda","Ibagué","Icononzo","Lérida","Líbano","Mariquita","Melgar","Murillo","Natagaima","Ortega","Palocabildo","Piedras","Planadas","Prado","Purificación","Rioblanco","Roncesvalles","Rovira","Saldaña","San Antonio","San Luis","Santa Isabel","Suárez","Valle de San Juan","Venadillo","Villahermosa","Villarrica"],
              "Valle del Cauca": ["Alcalá","Andalucía","Ansermanuevo","Argelia","Bolívar","Buenaventura","Buga","Bugalagrande","Caicedonia","Cali","Calima","Candelaria","Cartago","Dagua","El Águila","El Cairo","El Cerrito","El Dovio","Florida","Ginebra","Guacarí","Jamundí","La Cumbre","La Unión","La Victoria","Obando","Palmira","Pradera","Restrepo","Riofrío","Roldanillo","San Pedro","Sevilla","Toro","Trujillo","Tuluá","Ulloa","Versalles","Vijes","Yotoco","Yumbo","Zarzal"],
              "Vaupés": ["Carurú","Mitú","Pacoa","Papunaua","Taraira","Yavaraté"],
              "Vichada": ["Cumaribo","La Primavera","Puerto Carreño","Santa Rosalía"]
            };

            const deptoSelect = document.getElementById('departamento');
            const ciudadSelect = document.getElementById('ciudad');
            const form = document.getElementById('checkout-form');

            // Populate departamentos
            const departamentos = Object.keys(departamentosCiudades).sort();
            departamentos.forEach(depto => {
                const option = document.createElement('option');
                option.value = depto;
                option.textContent = depto;
                deptoSelect.appendChild(option);
            });

            // Handle departamento change
            deptoSelect.addEventListener('change', () => {
                const selectedDepto = deptoSelect.value;
                // Clear previous ciudades
                ciudadSelect.innerHTML = '<option value="">Selecciona una ciudad...</option>';

                if (selectedDepto) {
                    ciudadSelect.disabled = false;
                    const ciudades = departamentosCiudades[selectedDepto].sort();
                    ciudades.forEach(ciudad => {
                        const option = document.createElement('option');
                        option.value = ciudad;
                        option.textContent = ciudad;
                        ciudadSelect.appendChild(option);
                    });
                } else {
                    ciudadSelect.disabled = true;
                }
            });

            // --- Form Validation ---
            const nombresInput = document.getElementById('nombres');
            const apellidosInput = document.getElementById('apellidos');
            const telefonoInput = document.getElementById('telefono');

            const textRegex = /^[a-zA-Z\s]+$/;
            const numberRegex = /^\d+$/;

            function validateField(input, regex, errorElementId) {
                const errorElement = document.getElementById(errorElementId);
                if (!regex.test(input.value)) {
                    errorElement.style.display = 'block';
                    return false;
                } else {
                    errorElement.style.display = 'none';
                    return true;
                }
            }

            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                const isNombresValid = validateField(nombresInput, textRegex, 'nombres-error');
                const isApellidosValid = validateField(apellidosInput, textRegex, 'apellidos-error');
                const isTelefonoValid = validateField(telefonoInput, numberRegex, 'telefono-error');

                if (!isNombresValid || !isApellidosValid || !isTelefonoValid || !deptoSelect.value || !ciudadSelect.value || !document.getElementById('direccion').value) {
                    alert('Por favor, corrige los errores y completa todos los campos.');
                    return;
                }

                const submitButton = form.querySelector('button[type="submit"]');
                submitButton.disabled = true;
                submitButton.textContent = 'Procesando...';

                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());
                const productTitle = document.getElementById('product-title').textContent;
                data.productTitle = productTitle;

                try {
                    const response = await fetch('/.netlify/functions/send-telegram', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    });

                    if (response.ok) {
                        alert('¡Compra realizada con éxito! Gracias por tu pedido. Recibirás una confirmación pronto.');
                        form.reset();
                        ciudadSelect.innerHTML = '<option value="">Selecciona una ciudad...</option>';
                        ciudadSelect.disabled = true;
                        document.getElementById('checkout-modal').classList.remove('active');
                    } else {
                        const error = await response.text();
                        alert(`Hubo un error al procesar tu pedido. Por favor, inténtalo de nuevo. Error: ${error}`);
                    }
                } catch (error) {
                    alert('Hubo un error de red. Por favor, revisa tu conexión e inténtalo de nuevo.');
                    console.error('Error en el fetch:', error);
                } finally {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Finalizar Compra';
                }
            });