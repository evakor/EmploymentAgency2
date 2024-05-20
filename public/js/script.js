function openNav() {
    document.getElementById("navSidePanel").style.width = "190px";
  }
  
function closeNav() {
    document.getElementById("navSidePanel").style.width = "0";
  }



    
function confirmApply(jobTitle) {
        if (confirm("Are you sure you want to apply for the position of '" + jobTitle + "'?")) {

        } else {
          alert("Job application was cancelled.");
        }
      }

