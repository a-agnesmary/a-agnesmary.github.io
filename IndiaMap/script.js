function showContent(state, capital, imageUrl, CMName, party, count, linkUrl,mothertong) {
    let contentDiv = document.getElementById("content");
    let stateName = document.getElementById("state-name");
    let capitalName = document.getElementById("capital-name");
    let stateImage = document.getElementById("state-image");
    let cmName = document.getElementById("cm-name");
    let PartyName = document.getElementById("party");
    let DistrictCount = document.getElementById("districtCount");
    let linkElement = document.getElementById("linkId");
    let MotherTongue = document.getElementById("MT");

    stateName.textContent = state;  
    capitalName.textContent = "Capital : " + capital;  
    stateImage.src = "Picture/" + imageUrl;
    stateImage.alt = state + " Image";
    cmName.textContent = "Chief Minister : " + CMName; 
    PartyName.textContent = "Party : " + party; 
    DistrictCount.textContent = "Number Of Districts: " + count;
    MotherTongue.textContent = "Mother Tongue Of "+state+" is : "+mothertong;
    linkElement.textContent = "Click here to learn more!";
    linkElement.href = linkUrl; 
    linkElement.target = "_blank"; 

    contentDiv.style.display = "block";  
    contentDiv.style.height = "auto"; 
}