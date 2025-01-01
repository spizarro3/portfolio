function bikeInitialize() {
  const btn = document.getElementById("myBtn");
  const modal = document.getElementById("bikeModal");
  const span = document.querySelector(".close");

  span.addEventListener("click", () => {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
  });
  modal.style.display = "block";
  modal.setAttribute("aria-hidden", "false");

//   const img = document.createElement("img");
//   img.src = "../media/Bikes/1.jpg"

//   modal.append(img)
  bikeImgRender(modal);
}

function bikeImgRender(pane){
    const bikes = ["../media/Bikes/1.jpg",
                   "../media/Bikes/2.jpg",
                   "../media/Bikes/3.jpg",
                   "../media/Bikes/4.jpg",
                   "../media/Bikes/5.jpg",
                   "../media/Bikes/6.jpg",
                   "../media/Bikes/7.jpg",
                   "../media/Bikes/8.jpg",
                   "../media/Bikes/9.jpg",
                   "../media/Bikes/10.jpg",
                   "../media/Bikes/11.jpg",
                   "../media/Bikes/12.jpg",
                   "../media/Bikes/13.jpg",
                   "../media/Bikes/14.jpg",
                   "../media/Bikes/15.jpg",
                   "../media/Bikes/16.jpg",
                   "../media/Bikes/17.jpg",
                   "../media/Bikes/18.jpg",
                   "../media/Bikes/19.jpg",
                   "../media/Bikes/20.jpg",
                   "../media/Bikes/21.jpg",
                   "../media/Bikes/22.jpg",
                   "../media/Bikes/23.jpg",
                   "../media/Bikes/24.jpg",
                   "../media/Bikes/25.jpg",]
                   bikes.forEach((src) => {
                    const img = document.createElement("img");
                    img.src = src;
                    img.style.position = "relative"; // To allow z-index to take effect
                    img.style.transition = "transform 0.3s ease-in-out, z-index 0.3s"; // Smooth transitions
            
                  
            
                    pane.append(img);
                });
}

