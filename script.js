(() => {
  const formSteps = document.querySelectorAll('.step');
  const nextButtons = document.querySelectorAll('.next-btn');
  const prevButtons = document.querySelectorAll('.prev-btn');

  const salarySelect = document.getElementById('salary');
  const educationSelect = document.getElementById('education');
  const propertySelect = document.getElementById('property');
  const landTypeGroup = document.getElementById('landTypeGroup');
  const landTypeSelect = document.getElementById('landType');

  propertySelect.addEventListener('change', () => {
    if (propertySelect.value === '5') {
      landTypeGroup.style.display = 'block';
    } else {
      landTypeGroup.style.display = 'none';
      landTypeSelect.value = '0';
    }
  });

  nextButtons.forEach(button => {
    button.addEventListener('click', () => {
      const currentStep = button.closest('.step');
      if (!validateStep(currentStep)) return;

      const nextStepNum = parseInt(button.getAttribute('data-next-step'), 10);
      goToStep(nextStepNum);
    });
  });

  prevButtons.forEach(button => {
    button.addEventListener('click', () => {
      const prevStepNum = parseInt(button.getAttribute('data-prev-step'), 10);
      goToStep(prevStepNum);
    });
  });

  function validateStep(step) {
    const inputs = step.querySelectorAll('select');
    for (const input of inputs) {
      if (!input.value) {
        alert('कृपया सभी प्रश्नों के उत्तर दें ताकि आगे बढ़ा जा सके।');
        return false;
      }
    }
    return true;
  }

  function goToStep(stepNumber) {
    formSteps.forEach(step => {
      step.classList.remove('active');
      if (parseInt(step.getAttribute('data-step'), 10) === stepNumber) {
        step.classList.add('active');
      }
    });
  }

  // Helper: Format Indian currency
  function formatINR(x) {
    let s = x.toFixed(0);
    let lastThree = s.slice(-3);
    let other = s.slice(0, -3);
    if (other !== '') lastThree = ',' + lastThree;
    return '₹' + other.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  }

  // Classification based on scores and logic
  function classifyBoy(inputs) {
    // Compute a weighted total score (simple aggregate)
    let score = 0;
    score += inputs.salaryScore * 5;           // max 25
    score += inputs.educationScore * 4;        // max 20
    score += inputs.propertyScore * 5;         // max 25
    score += inputs.landTypeScore * 3;          // max 12
    score += inputs.familySizeScore * 2;       // max 10
    score += inputs.govtJobScore * 3;           // max 15
    score += inputs.vehiclesScore * 3;          // max 15
    score += inputs.jewelryScore * 2;           // max 10
    score += inputs.attendeesScore;             // max 5
    score += inputs.travelWishScore * 2;        // max 10
    // Cooking skill multiplier
    if (inputs.cookingSkillScore === 5) score += 3;
    else if (inputs.cookingSkillScore === 3) score += 1;

    // Categorize by score thresholds (max ~135 approx)
    if (score >= 95) return 'legendary';
    if (score >= 65) return 'high';
    if (score >= 40) return 'moderate';
    return 'low';
  }

  // Generate dowry package based on classification
  function generatePackage(type, inputs) {
    let desc = "";
    let packageName = "";
    let jokes = [];

    switch(type) {
      case 'legendary':
        packageName = "👑 लीजेंडरी लडका पैकेज";
        desc = `तुम्हारी वैल्यू देखते हुए लड़की वाले पूरी दुनिया की दौलत देंगे!  
- आलीशान महल 🏰  
- लग्ज़री कारों का कलेक्शन 🚗🏎️  
- किलो सोने के गहने 💰  
- दुनिया भर की हनीमून ट्रिप ✈️🌍  
- पूरे परिवार का जयकारा! 🎉`;
        jokes.push("भाग जा वरना शादी ऐसी होगी कि Netflix पर सीरीज़ बनानी पड़ेगी।");
        break;

      case 'high':
        packageName = "✨ हाई वैल्यू पैकेज";
        desc = `तुम्हारी मेहनत रंग लाई! लड़की वाले देंगे:  
- शानदार घर या गांव में जमीन 🏡🌿  
- एक या दो कार 🚙🚗  
- अच्छा खासा सोना 100-200 ग्राम 💎  
- विदेशी या देशी हनीमून ट्रिप ✈️  
- परिवार से खूब तोहफे 🎁`;
        jokes.push("भाई सही कदम उठाया, अब तो DJ बजाना बाकी है!");
        break;

      case 'moderate':
        packageName = "👌 मध्यम वैल्यू पैकेज";
        desc = `ठीकठाक हालात हैं दोस्त, तोहफों में मिलेगा:  
- छोटा घर या फ्लैट 🏢  
- एक कार या बाइक 🏍️  
- हल्का सोना या चाँदी 💍  
- स्थानीय ट्रिप ✈️  
- शादी में मेहमानों का जोश 🎉`;
        jokes.push("जरा ध्यान रखना, वरना दादी माँ का डांस गायब न हो जाए!");
        break;

      case 'low':
        packageName = "😅 बेसिक पैकेज";
        desc = `भाई, कोशिश तो की लेकिन:  
- घर बस यादों में 🏚️  
- बाइक चलाओ या पैदल चलो 🏍️🚶‍♂️  
- थोड़े-बहुत आशीर्वाद और मिठाई 🎂  
- हनीमून? सोचना भी मत! 😄`;
        jokes.push("शादी में खूब पकोड़े खाओ और मज़े से जियो!");
        break;
    }

    // Add some personalized comments based on inputs
    if (inputs.cookingSkillScore === 5) {
      jokes.push("🍳 खाना बनाने का काम तुमसे बेहतर कोई नहीं करेगा!");
    } else if (inputs.cookingSkillScore === 1) {
      jokes.push("तुम्हें खाना बनाना सीखना पड़ेगा भैया, वरना मुश्किल होगी।");
    }

    if (inputs.govtJobScore === 5) {
      jokes.push("सरकारी नौकरी वाले हो, आश्रम की शांति जैसी शादी होगी।");
    } else {
      jokes.push("सरकारी नौकरी नहीं तो कुछ तो खटपट तो होगी ही। 😜");
    }

    return {
      packageName,
      desc,
      jokes
    };
  }

  document.getElementById('calculateBtn').addEventListener('click', (e) => {
    e.preventDefault();

    if (!validateStep(document.querySelector('.step.active'))) return;

    const salaryScore = +salarySelect.value;
    const educationScore = +educationSelect.value;
    const propertyScore = +propertySelect.value;
    const landTypeScore = +landTypeSelect.value || 0;
    const familySizeScore = +document.getElementById('familySize').value;
    const govtJobScore = +document.getElementById('parentsJob').value;
    const vehiclesScore = +document.getElementById('vehicles').value;
    const jewelryScore = +document.getElementById('jewelry').value;
    const attendeesScore = +document.getElementById('attendees').value;
    const travelWishScore = +document.getElementById('travelWish').value;
    const cookingSkillScore = +document.getElementById('cookingSkill').value;

    const inputs = {
      salaryScore, educationScore, propertyScore, landTypeScore,
      familySizeScore, govtJobScore, vehiclesScore, jewelryScore,
      attendeesScore, travelWishScore, cookingSkillScore
    };

    const classification = classifyBoy(inputs);

    // Calculate simplified total dowry approximation (for display)
    const approxDowry = 
      salaryScore * 50000 +
      educationScore * 20000 +
      propertyScore * 50000 +
      landTypeScore * 30000 +
      familySizeScore * 10000 +
      govtJobScore * 30000 +
      vehiclesScore * 20000 +
      jewelryScore * 25000 +
      attendeesScore * 10000 +
      travelWishScore * 20000;

    const { packageName, desc, jokes } = generatePackage(classification, inputs);

    const jokesHTML = jokes.map(j => `<p style="font-style: italic; color: #7a5c33;">• ${j}</p>`).join('');

    const finalHTML = `
      <h2>आपका डाउरी पैकेज: <span style="color: #d35400;">${packageName}</span></h2>
      <p style="white-space: pre-line; font-size: 1.2rem; margin-top: 15px;">${desc}</p>
      ${jokesHTML}
      <h3 style="margin-top: 20px;">अनुमानित कुल डाउरी मूल्य: ${formatINR(approxDowry)}</h3>
    `;

    document.getElementById('dowryOutput').innerHTML = finalHTML;
    document.getElementById('formSteps').style.display = 'none';
    document.getElementById('result').style.display = 'flex';
  });

  document.getElementById('restartBtn').addEventListener('click', () => {
    document.getElementById('result').style.display = 'none';
    document.getElementById('formSteps').style.display = 'block';
    goToStep(1);
    document.querySelectorAll('select').forEach(sel => sel.value = '');
    landTypeGroup.style.display = 'none';
  });

})();