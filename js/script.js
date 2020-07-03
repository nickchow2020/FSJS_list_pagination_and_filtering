/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
 *global Variable That We need for This project
***/
        // variable that target on students Ul tag;
const studentsUl = document.querySelector(".student-list");
        // variable that store all list element under the students Ul tags;
const studentsUlList = studentsUl.children;
        // initial the current page to one;
const currentPage = 1;
        // initial the rows students per page;
const rowsPerPage = 10;
        // target on the parent of pagination section;
const pageWrapper = document.querySelector(".page")
        // variable target on searchbox parent;
const pageHeader = document.querySelector(".page-header");





/*** 
 *function that is going to who the only 10 rows perpages and hide the rest
    **page argument is represent the current page
    **student argument target on student ranges;
***/
function showPage(page,students){
        // making sure to empty the previous contents used for loops
        const listLength = students.length;//set highest index in for loops

        //use for loop to empty the front page;
        for(let i = 0; i < listLength; i ++){
                students[i].style.display = "";
        }

        page -- // set the page to minus one,making the start index position is begin at 0;
        const startIndex = page * rowsPerPage;  // set the start index
        const endIndex = startIndex + rowsPerPage; // set the end index

        /**use for loop to loop through each index according the variable startIndex and endIndex and 
        set it's display property to block;**/
        for(let i = startIndex; i < endIndex; i ++){
                /**if statement filters studentsUlList[i] equivalent to undefined*/
                if(students[i]){ 
                        students[i].style.display = "block";
                }
        }
}



/*** 
 *function that is going to generate the Pagination Buttons and it's functionalities
 btnNumber is the button's contents like 1,2,3,4,5,6
***/
function createPaginationBtn(btnNumber){
        let page = btnNumber + 1; // because we start the for loop at index of 0,making sure the buttons number no equivalent to 0

        const li = document.createElement("li");//create li element
        const a = document.createElement("a");//create anthor tags elements
        a.textContent = page; //set anthor tags textconent to page
        li.appendChild(a);//append anchor tag to li tags
        uls.appendChild(li);// append li tags to global varialbe uls;

        if(currentPage === page)a.classList.add("active");//add first class "action" to first paginated button
        /**
         * Add an Eventlistener to each anchor tags,when click run the function showPage() and remove and add the 
         * class active to button when click.
         */
        a.addEventListener("click",(e)=>{
                 const buttonContents = e.target.textContent;// get the showpage() argument value
                 const activeBtn = document.querySelector(".active") // select the anthor tag with class of active
                 activeBtn.classList.remove("active"); // remove class active when click
                 showPage(buttonContents,studentsUlList);// call the showPage() and pass it's argument value when click
                 a.classList.add("active");// add  class active when click a tags
        })

        return li;
}






/**Function that is going to add pagination div tags and the nest ul tags 
 * into pages use insertAdjacentHTML property.
 */
function appendPaginateDiv(parent){
        /*** 
         * first step going to create a html of pagination
         * ***/
        let paginationDiv =`<div class="pagination"><ul></ul></div>`;
        parent.insertAdjacentHTML("beforeend",paginationDiv);
}



/*** 
 *function that is going to generate the pagination buttons according to the length of the students.
 and called a function of "createPaginationBtn" that is handle the funtionally of each button.
 lengths is argument represent total amount of student
***/
function appendPaginateBtn(lengths){
        /**variable:
         * Use Math.ceil to level up the numbers of buttons
         * use students total divide by the rowsPerpages
         */
        const totalStudents =  lengths.length;  //totals student value
        const totalBtn = Math.ceil(totalStudents / rowsPerPage) // total buttons

        /**
         * Use for loop to loop throught the numbers of pagination and called the 
         * function of createPaginationBtn.
         */
        window.uls = document.querySelector(".pagination ul"); // set uls as global variables so other function can use.

        /**create paginated button according to the length of the content */
        for(let i = 0;i < totalBtn; i ++){
                let paginated = createPaginationBtn(i);// store each li tags return from createPaginatedBtn()
                uls.appendChild(paginated);// append each li tags to global variable uls
        }

}


/*** 
 **function that is going to create searchBar functionality
 **create searchbox and stored all the date into localStored and use for loop to 
 crap the right one
***/
function searchBar(){
        const div = document.createElement("div");//create div tags
        const input = document.createElement("input");//create input tags
        const button = document.createElement("button");//create button tags
        div.classList.add("student-search");//add class "student-search" to div tags
        input.setAttribute("placeholder","Search for students...");//add attributes placeholder to search input
        button.textContent = "Search";// set search button to Search
        div.appendChild(input);//append searchbar to "student-search" div
        div.appendChild(button);//append searchButton to "student-search" div
        pageHeader.appendChild(div);//append "student-search" div to header of pages
        const avatars = document.querySelectorAll(".avatar"); // grasp all the img url
        const names = document.querySelectorAll(".student-details h3") // grasp all the student name
        const emails = document.querySelectorAll(".email");//grasp all student email
        const dates = document.querySelectorAll(".date");//grasp all student joined date

        let src = [] //set empty array to store student avatar url
        let studentsName = []//empty arrray to store students name
        let studentEmails = []//empty array to store students email
        let joined = []//empty array to store students joined date

        /**for loop to push all student's url,name,email and joined date
         * to it's arrays
        */
        for(let i = 0; i < studentsUlList.length; i ++){
                src.push(avatars[i].getAttribute("src"));
                studentsName.push(names[i].textContent);
                studentEmails.push(emails[i].textContent);
                joined.push(dates[i].textContent);
        }

        //structure students date into object date
        const studentsInfo = {
                avatars : src,
                names : studentsName,
                emails : studentEmails,
                dates : joined

        }
        // set all it's date into localStorege and set it's items name to student
        localStorage.setItem("student",JSON.stringify(studentsInfo));

       
        //addEventlistener to input with keyup events
        input.addEventListener("keyup",()=>{
                studentsUl.innerHTML = "";   //reset all date to empty string
                const studentDate = JSON.parse(localStorage.getItem("student")); //retrieve date from localStorge
                let searchValue = input.value.toLowerCase();//get search input value
                let lengths = studentDate.names.length;//store the length of match student search
                let totalLengths = [];//stored the length of match student search's

                /**For loop to loop through all date that retrieve from the localStorege comparison 
                 * to the input search Value */
                        for(let i = 0; i < lengths; i ++){
                                /**
                                 * if conditional statement to check the search input it match
                                 * if if match grasp it's index value and get it's matching value
                                 */
                                if(studentDate.names[i].indexOf(searchValue) > -1){
                                        const studentDate = JSON.parse(localStorage.getItem("student"))
                                        let imgSrc = studentDate.avatars[i];
                                        let studentName = studentDate.names[i];
                                        let studentEmail = studentDate.emails[i];
                                        let joinDate = studentDate.dates[i];

                                        totalLengths.push(joinDate);//push data to define the length of match students

                                        /**
                                         * call studentLists function to display student date
                                         * that match from the date match index.
                                         */
                                        const studentHTML = studentLists(imgSrc,studentName,studentEmail,joinDate);
                                        studentsUl.innerHTML += `${studentHTML}`;//add it's date to the "student-list" ul
                                        showPage(currentPage,studentsUlList);//called showPage() with all Student                    
                                }
                        }
                        uls.innerHTML = "";//clear up the previous pagination buttons
                        appendPaginateBtn(totalLengths);//add pagination buttons according with the match students.
                if(totalLengths.length === 0){
                        studentsUl.innerHTML = `<h3>No Results</h3>`;
                }
        })
}


/*** 
 *function generated the student list elements
***/
function studentLists(src,name,email,date){
        let listHTML = 
        `
        <li class="student-item cf" style="display:block">
            <div class="student-details">
                <img class="avatar" src="${src}">
                <h3>${name}</h3>
                <span class="email">${email}</span>
            </div>
            <div class="joined-details">
                   <span class="date">${date}</span>
           </div>
        </li>
        `;
        return listHTML;
}
showPage(currentPage,studentsUlList);//add students to page
appendPaginateDiv(pageWrapper);//append pagination div to he page
appendPaginateBtn(studentsUlList);//add pagination buttons to the page
searchBar();//search box features and add it's functional date.with click events
