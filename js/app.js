/** ///////////////////////////////////////////////////
 * Create a Landing Page With dynamic content
 * Adding & DeLeting sections dynamically with dynamic data
///////////////////////////////////////////////////////////*/


// startup variables

const addBtn = document.getElementById("btn");
const content = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec 
libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.`;

// array of objects contains first 4 section 
let sections = [
  {
    sectionId: 1,
    name: "About us",
    content: content,
  },
  {
    sectionId: 2,
    name: "Our Service",
    content: content,
  },
  {
    sectionId: 3,
    name: "Portifolio",
    content: content,
  },
  {
    sectionId: 4,
    name: "Shopping",
    content: content,
  },
];

// function to get section from array and append them on website
function BuildWebsit(items) {
  // clear old sections to prevent dublication
  document.querySelector("main").innerHTML = "";
  // get all sections in array and append them to main  html
  items.forEach((item) => {
    const content = `<section id="section${item.sectionId}" data-nav="${item.name}">
    <div class="landing__container">
      
        <h2>${item.name}${item.sectionId}<span  onclick="deleteSection(${item.sectionId})"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" class="bi bi-x-square-fill" viewBox="0 0 16 16">
         <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
         </svg><span> </h2>
         <button class="collaps"> </button>
          <p>${item.content}</p>
          <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
        
     </div>

    </section>`;
    document.querySelector("main").insertAdjacentHTML("beforeend", content);
  });
}


window.onload = function () {
  BuildWebsit(sections);
  addNavLink();
  observingSections();
};

// add Section funtion
function addSection(e) {
  let lastSectionId = sections.length
    ? sections[sections.length - 1].sectionId
    : 0;
  let nameSection = document.getElementById("name__section").value;
  let contentSection = document.getElementById("content__section").value;

  // last added section
  let addedSection = { ...sections[sections.length - 1] };

  const sectionContent = `<section id="${addedSection.name}${addedSection.sectionId}" data-nav="${addedSection.name}">
  <div class="landing__container">
  <h2>${addedSection.name}${addedSection.sectionId}<span  onclick="deleteSection(${addedSection.sectionId})"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" class="bi bi-x-square-fill" viewBox="0 0 16 16">
  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
</svg><span> </h2>
  <p>${addedSection.content}</p>
  <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
  </div>
  </section>`;


  // console.log(lastSectionId);
  // simple validation in case user didn't enter any  value
  if (nameSection == "") alert("Enter section name");
  if (contentSection == "") alert("Enter section content");

  // add to array 
  sections.push({
    sectionId: ++lastSectionId,
    name: nameSection,
    content: contentSection,
  });

  // console.log(sections);
  document
    .querySelector("main")
    .insertAdjacentHTML("beforeend", sectionContent);
}

// Delete section function
function deleteSection(id) {
  let index = sections
    .map((section) => {
      return section.sectionId;
    })
    .indexOf(id);

  if (index !== -1) {
    sections.splice(index, 1);
    BuildWebsit(sections);
  }
}

const navbar = document.getElementById("navbar__list");
const addNavLink = () => {
  navbar.innerHTML = "";
  document.querySelectorAll("section").forEach((section) => {
    const listItem = `<li><a href="#${section.id}" data-nav="${section.id}" class="menu__link">${section.dataset.nav}</a></li>`;
    navbar.insertAdjacentHTML("beforeend", listItem);
  });
};

// Add section
addBtn.addEventListener("click", (e) => {
  e.preventDefault();

  addSection();
  addNavLink();
  observingSections();
});

  


// function to observe the section to specify which section on the viewport and its link
const observingSections = () => {
  const observer = new IntersectionObserver(
    function (entries) {

      // loop over entries (sections)
      entries.map((entry) => {
        // console.log(entry);
        // get active link by using the id of the section on viewport
        let activeLink = navbar.querySelector(`[data-nav=${entry.target.id}]`);
        if (entry.isIntersecting) {
          // add active class to the section on viewport
          // add active class to the section's link
          entry.target.classList.add("your-active-class");
          activeLink.classList.add("active-link");
          // edit the hash of location manual cause i prevent default behavior
          location.hash = `${entry.target.id}`;
        } else {
          // remove active classes
          entry.target.classList.remove("your-active-class");
          activeLink.classList.remove("active-link");
        }
      });
    },
    {
      threshold: 0.6,
    }
  );
  return document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });
};

 
//  on clicking  on nav links will go smoothly to the correct section
navbar.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.dataset.nav) {
    document
      .getElementById(`${event.target.dataset.nav}`)
      .scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      location.hash = `${event.target.dataset.nav}`;
    }, 200);
  }
});

// save the icon used to go to the top and the header in variables
const toTop = document.getElementById("to-top");
const header = document.querySelector(".page__header");

//  Clicking on the icon the document will scroll to the top smoothly
toTop.addEventListener("click", () => {
  document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
});
// /**
//  * the header  will hidden   after 8 seconds and appear again when scrolling.
//  * button to top will appear  after scroll to down with 500 hight 
//  */

let isScrolling;
document.onscroll = () => {
  if (window.pageYOffset > 500) toTop.style.display = "block";
  else toTop.style.display = "none";

  header.style.display = "block";
  clearTimeout(isScrolling);
  isScrolling = setTimeout(() => {
    header.style.display = "none";
  }, 8000);
};


// collaps Sections still working on this feature
document.querySelector("collaps").addEventListener("click",()=>{

  document.querySelector("desc").style.display="block";

});
 