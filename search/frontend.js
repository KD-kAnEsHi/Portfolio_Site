document.addEventListener("DOMContentLoaded", () => {
    const clickSidebar = document.getElementById("sidebar");
    const clickSidebarDiv = clickSidebar.querySelector("div");
    const clickSidarButton = document.getElementById("sidebar-toggle");

    let sideBarOpen = true;
    clickSidarButton.addEventListener('click', () => {
        if(sideBarOpen == true)
        {
            clickSidebar.style.left = "-180px";
            clickSidarButton.textContent = ">|";
            clickSidarButton.style.right = "-30px";
            clickSidarButton.style.background = "#121212";
            clickSidebar.style.backgroundColor = "#121212";
        }
        else
        {
            clickSidebar.style.left = "-10px";
            clickSidarButton.style.right = "-7px";
            clickSidebar.style.backgroundColor = "#36454F";
            clickSidarButton.style.background = "transparent";
            clickSidarButton.textContent = "|<";   
        }
        sideBarOpen = !sideBarOpen;
    });
});


    