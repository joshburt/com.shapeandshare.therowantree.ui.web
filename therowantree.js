(function (doc, nav) {
    "use strict";

    var userGUID = '';

    var accessKeyGuid = '285bc061-a271-4463-89f9-c52567656e48';
    var apiVersion = '0.1.0';
    var api_url = 'http://localhost:5000';

    // var pollButton;
    
    var gathererLabel;
    var gathererLabelString = '+ gatherer (*)';
    var gathererIncreaseButton;
    var gathererDecreaseButton;

    var hunterLabel;
    var hunterLabelString = '+ hunter (*)';
    var hunterIncreaseButton;
    var hunterDecreaseButton;

    var trapperLabel;
    var trapperLabelString = '+ trapper (*)';
    var trapperIncreaseButton;
    var trapperDecreaseButton;

    var farmerLabel;
    var farmerLabelString = '+ farmer (*)';
    var farmerIncreaseButton;
    var farmerDecreaseButton;

    var tannerLabel;
    var tannerLabelString = '+ tanner (*)';
    var tannerIncreaseButton;
    var tannerDecreaseButton;

    var charcutierLabel;
    var charcutierLabelString = '+ charcutier (*)';
    var charcutierIncreaseButton;
    var charcutierDecreaseButton;

    var iron_minerLabel;
    var iron_minerLabelString = '+ iron miner (*)';
    var iron_minerIncreaseButton;
    var iron_minerDecreaseButton;

    var coal_minerLabel;
    var coal_minerLabelString = '+ coal miner (*)';
    var coal_minerIncreaseButton;
    var coal_minerDecreaseButton;

    var sulphur_minerLabel;
    var sulphur_minerLabelString = '+ sulphur miner (*)';
    var sulphur_minerIncreaseButton;
    var sulphur_minerDecreaseButton;

    var steelworkerLabel;
    var steelworkerLabelString = '+ steelworker (*)';
    var steelworkerIncreaseButton;
    var steelworkerDecreaseButton;

    var armourerLabel;
    var armourerLabelString = '+ armourer (*)';
    var armourerIncreaseButton;
    var armourerDecreaseButton;

    var stores;
    var storesString = '';
    var storesPanel;

    var status = 0;
    var statusString = '';
    var statusPanel;

    var income;
    var incomeString = '';
    var incomePanel;

    var activeFeature;
    var activeFeatureString = '';
    var activeFeaturePanel;

    var features;
    var featuresString = '';
    var featuresPanel;

    var population;
    var populationString = '';
    var populationPanel;


    // merchant transform buttons
    var woodMerchantTransformButton;
    var stoneMerchantTransformButton;
    var furMerchantTransformButton;
    var baitMerchantTransformButton;
    var teethMerchantTransformButton;
    var meatMerchantTransformButton;
    var scalesMerchantTransformButton;
    var clothMerchantTransformButton;
    var charmMerchantTransformButton;
    var gemsMerchantTransformButton;
    var coinsMerchantTransformButton;
    var seedMerchantTransformButton;
    var cropsMerchantTransformButton;
    var leatherMerchantTransformButton;
    var cured_meatMerchantTransformButton;
    var compassMerchantTransformButton;
    var medicineMerchantTransformButton;
    var torchMerchantTransformButton;
    var meatpieMerchantTransformButton;
    var bone_spearMerchantTransformButton;
    var waterskinMerchantTransformButton;
    var rucksackMerchantTransformButton;
    var leather_armourMerchantTransformButton;
    var ironMerchantTransformButton;
    var caskMerchantTransformButton;
    var iron_swordMerchantTransformButton;
    var wagonMerchantTransformButton;
    var iron_armourMerchantTransformButton;
    var steelMerchantTransformButton;
    var coalMerchantTransformButton;
    var water_tankMerchantTransformButton;
    var convoyMerchantTransformButton;
    var steel_armourMerchantTransformButton;
    var steel_swordMerchantTransformButton;
    var rifleMerchantTransformButton;
    var bulletsMerchantTransformButton;
    var alien_alloyMerchantTransformButton;
    var bolasMerchantTransformButton;
    var energy_cellMerchantTransformButton;
    var laser_rifleMerchantTransformButton;
    var sulphurMerchantTransformButton;
    var bayonetMerchantTransformButton;
    var grenadeMerchantTransformButton;




    function UpdateAllTheThings() {
        // set the initial game state
        updateGameState();

        // build the initial ui
        updateUI();
    }

    function buildStatus() {
        switch(status) {
            case 0:
                statusString = 'You are NOT active.'; 
                break;
            case 1:
                statusString = 'You are active.'; 
                break;
            default:
                statusString = 'You are dreaming..';
                break;
        }
        return statusString;
    }

    function buildStores() {
        if (stores == null) {
            storesString = 'Your pockets are empty..';
        }
        else{
            storesString = '+-- stores ----------------<br>';
            for (var key in stores){
                var store_obj = stores[key]
                var amount = store_obj['amount']
                var description = store_obj['description']
                storesString += "| " + key + " (" + amount + ")"
                if (description != null) {
                    storesString += " (" + description + ")";
                }
                storesString += "<br>";
            }
            storesString += '+--------------------------';
        }
        return storesString;
    }

    function buildActiveFeature() {
        if (activeFeature == null) {
            activeFeatureString = 'you are in the void.';
        }
        else {
            activeFeatureString = '+-- active location -----<br>';
            activeFeatureString += '| ' + activeFeature + '<br>';
            activeFeatureString += '+--------------------------';
        }
        return activeFeatureString;
    }

    function buildFeatures() {
        if (features == null) {
            featuresString = 'you are in the void.';
        }
        else {
                featuresString = '+-- features --------------<br>';
                for (var feature in features){
                    featuresString += '| ' + features[feature] + '<br>'
                }
                featuresString += '+--------------------------';
        }
        return featuresString;
    }

    function buildPopulation() {
        if (populationString == null) {
            populationString = 'you are not even one';
        }
        else {
            populationString = '+-- population ----------<br>';
            populationString += '| ' + population + '<br>';
            populationString += '+--------------------------';

        }
        return populationString;
    }

    function updateUI() {
        statusPanel.innerHTML = buildStatus();
        storesPanel.innerHTML = buildStores();

        if (income == null) {
            //gathererLabelString = 'You have no income while you slumber..';
        }
        else {
            if (income['gatherer']) {
                gathererLabelString = '+ gatherer (' + income['gatherer']['amount'] + ')';
                gathererLabel.display = "inline";
                gathererIncreaseButton.display = "inline";
                gathererDecreaseButton.display = "inline";      
            }
            else {
                gathererLabel.display = "none";
                gathererIncreaseButton.display = "none";
                gathererDecreaseButton.display = "none";
            }
            
            if (income['hunter']){
                hunterLabelString = '+ hunter (' + income['hunter']['amount'] + ')';
                hunterLabel.display = "inline";
                hunterIncreaseButton.display = "inline";
                hunterDecreaseButton.display = "inline";  
            }
            else {
                hunterLabel.display = "none";
                hunterIncreaseButton.display = "none";
                hunterDecreaseButton.display = "none";  
            }

            if (income['trapper']){
                trapperLabelString = '+ trapper (' + income['trapper']['amount'] + ')';
                trapperLabel.display = "inline";
                trapperIncreaseButton.display = "inline";
                trapperDecreaseButton.display = "inline";  
            }
            else {
                trapperLabel.display = "none";
                trapperIncreaseButton.display = "none";
                trapperDecreaseButton.display = "none";  
            }
            
            if (income['farmer']){
                farmerLabelString = '+ farmer (' + income['farmer']['amount'] + ')';
                farmerLabel.style.display = "inline";
                farmerIncreaseButton.style.display = "inline";
                farmerDecreaseButton.style.display = "inline";                 
            }
            else {
                farmerLabel.style.display = "none";
                farmerIncreaseButton.style.display = "none";
                farmerDecreaseButton.style.display = "none"; 
            }
            
            if (income['tanner']){
                tannerLabelString = '+ tanner (' + income['tanner']['amount'] + ')';
                tannerLabel.style.display = "inline";
                tannerIncreaseButton.style.display = "inline";
                tannerDecreaseButton.style.display = "inline";                 
            }
            else {
                tannerLabel.style.display = "none";
                tannerIncreaseButton.style.display = "none";
                tannerDecreaseButton.style.display = "none"; 
            }
            
            if (income['charcutier']){
                charcutierLabelString = '+ charcutier (' + income['charcutier']['amount'] + ')';
                charcutierLabel.style.display = "inline";
                charcutierIncreaseButton.style.display = "inline";
                charcutierDecreaseButton.style.display = "inline";                 
            }
            else {
                charcutierLabel.style.display = "none";
                charcutierIncreaseButton.style.display = "none";
                charcutierDecreaseButton.style.display = "none"; 
            }
            
            if (income['iron_miner']){
                iron_minerLabelString = '+ iron miner (' + income['iron_miner']['amount'] + ')';
                iron_minerLabel.style.display = "inline";
                iron_minerIncreaseButton.style.display = "inline";
                iron_minerDecreaseButton.style.display = "inline";                 
            }
            else {
                iron_minerLabel.style.display = "none";
                iron_minerIncreaseButton.style.display = "none";
                iron_minerDecreaseButton.style.display = "none"; 
            }
            
            if (income['coal_miner']){
                coal_minerLabelString = '+ coal miner (' + income['coal_miner']['amount'] + ')';
                coal_minerLabel.style.display = "inline";
                coal_minerIncreaseButton.style.display = "inline";
                coal_minerDecreaseButton.style.display = "inline";                 
            }
            else {
                coal_minerLabel.style.display = "none";
                coal_minerIncreaseButton.style.display = "none";
                coal_minerDecreaseButton.style.display = "none"; 
            }
            
            if (income['sulphur_miner']){
                sulphur_minerLabelString = '+ sulphur miner (' + income['sulphur_miner']['amount'] + ')';
                sulphur_minerLabel.style.display = "inline";
                sulphur_minerIncreaseButton.style.display = "inline";
                sulphur_minerDecreaseButton.style.display = "inline";                 
            }
            else {
                sulphur_minerLabel.style.display = "none";
                sulphur_minerIncreaseButton.style.display = "none";
                sulphur_minerDecreaseButton.style.display = "none"; 
            }
            
            if (income['steelworker']){
                steelworkerLabelString = '+ steelworker (' + income['steelworker']['amount'] + ')';
                steelworkerLabel.style.display = "inline";
                steelworkerIncreaseButton.style.display = "inline";
                steelworkerDecreaseButton.style.display = "inline";                 
            }
            else {
                steelworkerLabel.style.display = "none";
                steelworkerIncreaseButton.style.display = "none";
                steelworkerDecreaseButton.style.display = "none"; 
            }
            
            if (income['armourer']){
                armourerLabelString = '+ armourer (' + income['armourer']['amount'] + ')';
                armourerLabel.style.display = "inline";
                armourerIncreaseButton.style.display = "inline";
                armourerDecreaseButton.style.display = "inline";                 
            }
            else {
                armourerLabel.style.display = "none";
                armourerIncreaseButton.style.display = "none";
                armourerDecreaseButton.style.display = "none"; 
            }
        }      
        gathererLabel.innerHTML = gathererLabelString;
        hunterLabel.innerHTML = hunterLabelString;
        trapperLabel.innerHTML = trapperLabelString;
        farmerLabel.innerHTML = farmerLabelString;
        tannerLabel.innerHTML = tannerLabelString;
        charcutierLabel.innerHTML = charcutierLabelString;
        iron_minerLabel.innerHTML = iron_minerLabelString;
        coal_minerLabel.innerHTML = coal_minerLabelString;
        sulphur_minerLabel.innerHTML = sulphur_minerLabelString;
        steelworkerLabel.innerHTML = steelworkerLabelString;
        armourerLabel.innerHTML = armourerLabelString;


        activeFeaturePanel.innerHTML = buildActiveFeature();
        featuresPanel.innerHTML = buildFeatures();
        populationPanel.innerHTML = buildPopulation();
    }

    function updateGameState() {
        var json_packet = { 'guid': userGUID };
        var json_out = JSON.stringify(json_packet);
        updateUserStoresGameState(json_out);
        updateUserStatusGameState(json_out);
        updateUserIncomeGameState(json_out);
        updateUserActiveFeatureState(json_out);
        updateUserFeaturesState(json_out);
        updateUserPopulationState(json_out);
    }

    function updateUserStoresGameState(guid) {
        $.ajax({
            url: api_url + '/api/user/stores',
            type: 'POST',
            headers:
                {
                    'Content-type': 'application/json',
                    'API-ACCESS-KEY': accessKeyGuid,
                    'API-VERSION': apiVersion
                },
            data: guid,
            success: function(data) {
                stores = data.stores;
            }
        });
    }

    function updateUserIncomeGameState(guid) {
        $.ajax({
            url: api_url + '/api/user/income',
            type: 'POST',
            headers:
                {
                    'Content-type': 'application/json',
                    'API-ACCESS-KEY': accessKeyGuid,
                    'API-VERSION': apiVersion
                },
            data: guid,
            success: function(data) {
                income = data.income;
            }
        });
    }

    function updateUserStatusGameState(guid) {
        $.ajax({
            url: api_url + '/api/user/active/state',
            type: 'POST',
            headers:
                {
                    'Content-type': 'application/json',
                    'API-ACCESS-KEY': accessKeyGuid,
                    'API-VERSION': apiVersion
                },
            data: guid,
            success: function(data) {
                status = data.active;
            }
        });
    }

    function setUserStatusActive() {
        var json_packet = { 'guid': userGUID, 'active': 1 };
        var json_out = JSON.stringify(json_packet);
        $.ajax({
            url: api_url + '/api/user/active/set',
            type: 'POST',
            headers:
                {
                    'Content-type': 'application/json',
                    'API-ACCESS-KEY': accessKeyGuid,
                    'API-VERSION': apiVersion
                },
            data: json_out
        });
    }

    function updateUserActiveFeatureState(guid) {
        $.ajax({
            url: api_url + '/api/user/active/feature',
            type: 'POST',
            headers:
                {
                    'Content-type': 'application/json',
                    'API-ACCESS-KEY': accessKeyGuid,
                    'API-VERSION': apiVersion
                },
            data: guid,
            success: function(data) {
                activeFeature = data.active_feature;
            }
        });
    }

    function updateUserFeaturesState(guid) {
        $.ajax({
            url: api_url + '/api/user/feature',
            type: 'POST',
            headers:
                {
                    'Content-type': 'application/json',
                    'API-ACCESS-KEY': accessKeyGuid,
                    'API-VERSION': apiVersion
                },
            data: guid,
            success: function(data) {
                features = data.features;
            }
        });
    }

    function updateUserPopulationState(guid) {
        $.ajax({
            url: api_url + '/api/user/population',
            type: 'POST',
            headers:
                {
                    'Content-type': 'application/json',
                    'API-ACCESS-KEY': accessKeyGuid,
                    'API-VERSION': apiVersion
                },
            data: guid,
            success: function(data) {
                population = data.population;
            }
        });
    }

    function updateUserIncomeSourceAllotment(raw_guid, textual_source_name, amount) {
        var json_packet = { 'guid': raw_guid, 'income_source_name': textual_source_name, 'amount': amount };
        var json_out = JSON.stringify(json_packet);
        console.log(json_out);
        $.ajax({
            url: api_url + '/api/user/income/set',
            type: 'POST',
            headers:
                {
                    'Content-type': 'application/json',
                    'API-ACCESS-KEY': accessKeyGuid,
                    'API-VERSION': apiVersion
                },
            data: json_out,
        });
    }

    function peformMerchantTransform(raw_guid, store_name) {
        var json_packet = { 'guid': raw_guid, 'store_name': store_name };
        var json_out = JSON.stringify(json_packet);
        console.log(json_out);
        $.ajax({
            url: api_url + '/api/merchant/transform',
            type: 'POST',
            headers:
                {
                    'Content-type': 'application/json',
                    'API-ACCESS-KEY': accessKeyGuid,
                    'API-VERSION': apiVersion
                },
            data: json_out,
        });
    }

    function createUser() {
        $.ajax({
            url: api_url + '/api/user/create',
            type: 'GET',
            headers:
                {
                    'Content-type': 'application/json',
                    'API-ACCESS-KEY': accessKeyGuid,
                    'API-VERSION': apiVersion
                },
            success: function(data) {
                userGUID = data.guid;
                localStorage.setItem("guid", data.guid);
            },
            async: false
        });
    }

    function initialize() {
        statusPanel = doc.getElementById("statusPanel");
        storesPanel = doc.getElementById("storesPanel");
        activeFeaturePanel = doc.getElementById("activeFeaturePanel");
        featuresPanel = doc.getElementById("featuresPanel");
        populationPanel = doc.getElementById("populationPanel");

        

        gathererIncreaseButton = doc.getElementById("gathererIncreaseButton");
        gathererIncreaseButton.addEventListener("click", function(){
            updateUserIncomeSourceAllotment(userGUID, 'gatherer', 1);
        })
        gathererDecreaseButton = doc.getElementById("gathererDecreaseButton");
        gathererDecreaseButton.addEventListener("click", function(){
           updateUserIncomeSourceAllotment(userGUID, 'gatherer', -1);
        })
        gathererLabel = doc.getElementById("gathererLabel");



        hunterIncreaseButton = doc.getElementById("hunterIncreaseButton");
        hunterIncreaseButton.addEventListener("click", function(){
            updateUserIncomeSourceAllotment(userGUID, 'hunter', 1);
        })
        hunterDecreaseButton = doc.getElementById("hunterDecreaseButton");
        hunterDecreaseButton.addEventListener("click", function(){
           updateUserIncomeSourceAllotment(userGUID, 'hunter', -1);
        })
        hunterLabel = doc.getElementById("hunterLabel");



        trapperIncreaseButton = doc.getElementById("trapperIncreaseButton");
        trapperIncreaseButton.addEventListener("click", function(){
            updateUserIncomeSourceAllotment(userGUID, 'trapper', 1);
        })
        trapperDecreaseButton = doc.getElementById("trapperDecreaseButton");
        trapperDecreaseButton.addEventListener("click", function(){
           updateUserIncomeSourceAllotment(userGUID, 'trapper', -1);
        })
        trapperLabel = doc.getElementById("trapperLabel");



        farmerIncreaseButton = doc.getElementById("farmerIncreaseButton");
        farmerIncreaseButton.addEventListener("click", function(){
            updateUserIncomeSourceAllotment(userGUID, 'farmer', 1);
        })
        farmerDecreaseButton = doc.getElementById("farmerDecreaseButton");
        farmerDecreaseButton.addEventListener("click", function(){
           updateUserIncomeSourceAllotment(userGUID, 'farmer', -1);
        })
        farmerLabel = doc.getElementById("farmerLabel");



        tannerIncreaseButton = doc.getElementById("tannerIncreaseButton");
        tannerIncreaseButton.addEventListener("click", function(){
            updateUserIncomeSourceAllotment(userGUID, 'tanner', 1);
        })
        tannerDecreaseButton = doc.getElementById("tannerDecreaseButton");
        tannerDecreaseButton.addEventListener("click", function(){
           updateUserIncomeSourceAllotment(userGUID, 'tanner', -1);
        })
        tannerLabel = doc.getElementById("tannerLabel");



        charcutierIncreaseButton = doc.getElementById("charcutierIncreaseButton");
        charcutierIncreaseButton.addEventListener("click", function(){
            updateUserIncomeSourceAllotment(userGUID, 'charcutier', 1);
        })
        charcutierDecreaseButton = doc.getElementById("charcutierDecreaseButton");
        charcutierDecreaseButton.addEventListener("click", function(){
           updateUserIncomeSourceAllotment(userGUID, 'charcutier', -1);
        })
        charcutierLabel = doc.getElementById("charcutierLabel");



        iron_minerIncreaseButton = doc.getElementById("iron_minerIncreaseButton");
        iron_minerIncreaseButton.addEventListener("click", function(){
            updateUserIncomeSourceAllotment(userGUID, 'iron miner', 1);
        })
        iron_minerDecreaseButton = doc.getElementById("iron_minerDecreaseButton");
        iron_minerDecreaseButton.addEventListener("click", function(){
           updateUserIncomeSourceAllotment(userGUID, 'iron miner', -1);
        })
        iron_minerLabel = doc.getElementById("iron_minerLabel");



        coal_minerIncreaseButton = doc.getElementById("coal_minerIncreaseButton");
        coal_minerIncreaseButton.addEventListener("click", function(){
            updateUserIncomeSourceAllotment(userGUID, 'coal miner', 1);
        })
        coal_minerDecreaseButton = doc.getElementById("coal_minerDecreaseButton");
        coal_minerDecreaseButton.addEventListener("click", function(){
           updateUserIncomeSourceAllotment(userGUID, 'coal miner', -1);
        })
        coal_minerLabel = doc.getElementById("coal_minerLabel");



        sulphur_minerIncreaseButton = doc.getElementById("sulphur_minerIncreaseButton");
        sulphur_minerIncreaseButton.addEventListener("click", function(){
            updateUserIncomeSourceAllotment(userGUID, 'sulphur miner', 1);
        })
        sulphur_minerDecreaseButton = doc.getElementById("sulphur_minerDecreaseButton");
        sulphur_minerDecreaseButton.addEventListener("click", function(){
           updateUserIncomeSourceAllotment(userGUID, 'sulpher miner', -1);
        })
        sulphur_minerLabel = doc.getElementById("sulphur_minerLabel");



        steelworkerIncreaseButton = doc.getElementById("steelworkerIncreaseButton");
        steelworkerIncreaseButton.addEventListener("click", function(){
            updateUserIncomeSourceAllotment(userGUID, 'steelworker', 1);
        })
        steelworkerDecreaseButton = doc.getElementById("steelworkerDecreaseButton");
        steelworkerDecreaseButton.addEventListener("click", function(){
           updateUserIncomeSourceAllotment(userGUID, 'steelworker', -1);
        })
        steelworkerLabel = doc.getElementById("steelworkerLabel");



        armourerIncreaseButton = doc.getElementById("armourerIncreaseButton");
        armourerIncreaseButton.addEventListener("click", function(){
            updateUserIncomeSourceAllotment(userGUID, 'armourer', 1);
        })
        armourerDecreaseButton = doc.getElementById("armourerDecreaseButton");
        armourerDecreaseButton.addEventListener("click", function(){
           updateUserIncomeSourceAllotment(userGUID, 'armourer', -1);
        })
        armourerLabel = doc.getElementById("armourerLabel");



        // Merchant Transform Buttons
        woodMerchantTransformButton = doc.getElementById("woodMerchantTransformButton");
        stoneMerchantTransformButton = doc.getElementById("stoneMerchantTransformButton");
        furMerchantTransformButton = doc.getElementById("furMerchantTransformButton");
        baitMerchantTransformButton = doc.getElementById("baitMerchantTransformButton");
        teethMerchantTransformButton = doc.getElementById("teethMerchantTransformButton");
        meatMerchantTransformButton = doc.getElementById("meatMerchantTransformButton");
        scalesMerchantTransformButton = doc.getElementById("scalesMerchantTransformButton");
        clothMerchantTransformButton = doc.getElementById("clothMerchantTransformButton");
        charmMerchantTransformButton = doc.getElementById("charmMerchantTransformButton");
        gemsMerchantTransformButton = doc.getElementById("gemsMerchantTransformButton");
        coinsMerchantTransformButton = doc.getElementById("coinsMerchantTransformButton");
        seedMerchantTransformButton = doc.getElementById("seedMerchantTransformButton");
        cropsMerchantTransformButton = doc.getElementById("cropsMerchantTransformButton");
        leatherMerchantTransformButton = doc.getElementById("leatherMerchantTransformButton");
        cured_meatMerchantTransformButton = doc.getElementById("cured_meatMerchantTransformButton");
        compassMerchantTransformButton = doc.getElementById("compassMerchantTransformButton");
        medicineMerchantTransformButton = doc.getElementById("medicineMerchantTransformButton");
        torchMerchantTransformButton = doc.getElementById("torchMerchantTransformButton");
        meatpieMerchantTransformButton = doc.getElementById("meatpieMerchantTransformButton");
        bone_spearMerchantTransformButton = doc.getElementById("bone_spearMerchantTransformButton");
        waterskinMerchantTransformButton = doc.getElementById("waterskinMerchantTransformButton");
        rucksackMerchantTransformButton = doc.getElementById("rucksackMerchantTransformButton");
        leather_armourMerchantTransformButton = doc.getElementById("leather_armourMerchantTransformButton");
        ironMerchantTransformButton = doc.getElementById("ironMerchantTransformButton");
        caskMerchantTransformButton = doc.getElementById("caskMerchantTransformButton");
        iron_swordMerchantTransformButton = doc.getElementById("iron_swordMerchantTransformButton");
        wagonMerchantTransformButton = doc.getElementById("wagonMerchantTransformButton");
        iron_armourMerchantTransformButton = doc.getElementById("iron_armourMerchantTransformButton");
        steelMerchantTransformButton = doc.getElementById("steelMerchantTransformButton");
        coalMerchantTransformButton = doc.getElementById("coalMerchantTransformButton");
        water_tankMerchantTransformButton = doc.getElementById("water_tankMerchantTransformButton");
        convoyMerchantTransformButton = doc.getElementById("convoyMerchantTransformButton");
        steel_armourMerchantTransformButton = doc.getElementById("steel_armourMerchantTransformButton");
        steel_swordMerchantTransformButton = doc.getElementById("steel_swordMerchantTransformButton");
        rifleMerchantTransformButton = doc.getElementById("rifleMerchantTransformButton");
        bulletsMerchantTransformButton = doc.getElementById("bulletsMerchantTransformButton");
        alien_alloyMerchantTransformButton = doc.getElementById("alien_alloyMerchantTransformButton");
        bolasMerchantTransformButton = doc.getElementById("bolasMerchantTransformButton");
        energy_cellMerchantTransformButton = doc.getElementById("energy_cellMerchantTransformButton");
        laser_rifleMerchantTransformButton = doc.getElementById("laser_rifleMerchantTransformButton");
        sulphurMerchantTransformButton = doc.getElementById("sulphurMerchantTransformButton");
        bayonetMerchantTransformButton = doc.getElementById("bayonetMerchantTransformButton");
        grenadeMerchantTransformButton = doc.getElementById("grenadeMerchantTransformButton");

        woodMerchantTransformButton.addEventListener("click", function(){ peformMerchantTransform(userGUID, 'wood'); })
        stoneMerchantTransformButton.addEventListener("click", function(){ peformMerchantTransform(userGUID, 'stone'); })
        furMerchantTransformButton.addEventListener("click", function(){ peformMerchantTransform(userGUID, 'fur'); })
        baitMerchantTransformButton.addEventListener("click", function(){ peformMerchantTransform(userGUID, 'bait'); })
        teethMerchantTransformButton.addEventListener("click", function(){ peformMerchantTransform(userGUID, 'teeth'); })
        meatMerchantTransformButton.addEventListener("click", function(){ peformMerchantTransform(userGUID, 'meat'); })
        scalesMerchantTransformButton.addEventListener("click", function(){ peformMerchantTransform(userGUID, 'scales'); })
        clothMerchantTransformButton.addEventListener("click", function(){ peformMerchantTransform(userGUID, 'cloth'); })
        charmMerchantTransformButton.addEventListener("click", function(){ peformMerchantTransform(userGUID, 'charm'); })
        gemsMerchantTransformButton.addEventListener("click", function(){ peformMerchantTransform(userGUID, 'gems'); })
        coinsMerchantTransformButton.addEventListener("click", function(){ peformMerchantTransform(userGUID, 'coins'); })
        seedMerchantTransformButton.addEventListener("click", function(){ peformMerchantTransform(userGUID, 'seed'); })
        cropsMerchantTransformButton.addEventListener("click", function(){ peformMerchantTransform(userGUID, 'crops'); })
        leatherMerchantTransformButton.addEventListener("click", function(){ peformMerchantTransform(userGUID, 'leather'); })
        cured_meatMerchantTransformButton.addEventListener("click", function(){ peformMerchantTransform(userGUID, 'cured meat'); })
        compassMerchantTransformButton.addEventListener("click", function(){ peformMerchantTransform(userGUID, 'compass'); })
        medicineMerchantTransformButton.addEventListener("click", function(){ peformMerchantTransform(userGUID, 'medicine'); })
        torchMerchantTransformButton.addEventListener("click", function(){ peformMerchantTransform(userGUID, 'torch'); })
        meatpieMerchantTransformButton.addEventListener("click", function(){ peformMerchantTransform(userGUID, 'meatpie'); })
        bone_spearMerchantTransformButton.addEventListener("click", function(){ peformMerchantTransform(userGUID, 'bone spear'); })
        waterskinMerchantTransformButton.addEventListener("click", function(){ peformMerchantTransform(userGUID, 'waterskin'); })
        rucksackMerchantTransformButton.addEventListener("click", function(){ peformMerchantTransform(userGUID, 'rucksack'); })
        leather_armourMerchantTransformButton.addEventListener("click", function(){ peformMerchantTransform(userGUID, 'leather armour'); })
        ironMerchantTransformButton.addEventListener("click", function(){ peformMerchantTransform(userGUID, 'iron'); })
        caskMerchantTransformButton.addEventListener("click", function(){ peformMerchantTransform(userGUID, 'cask'); })
        iron_swordMerchantTransformButton.addEventListener("click", function(){ peformMerchantTransform(userGUID, 'iron sword'); })
        wagonMerchantTransformButton.addEventListener("click", function(){ peformMerchantTransform(userGUID, 'wagon'); })
        iron_armourMerchantTransformButton.addEventListener("click", function(){ peformMerchantTransform(userGUID, 'iron armour'); })
        steelMerchantTransformButton.addEventListener("click", function(){ peformMerchantTransform(userGUID, 'steel'); })
        coalMerchantTransformButton.addEventListener("click", function(){ peformMerchantTransform(userGUID, 'coal'); })
        water_tankMerchantTransformButton.addEventListener("click", function(){ peformMerchantTransform(userGUID, 'water tank'); })
        convoyMerchantTransformButton.addEventListener("click", function(){ peformMerchantTransform(userGUID, 'convoy'); })
        steel_armourMerchantTransformButton.addEventListener("click", function(){ peformMerchantTransform(userGUID, 'steel armour'); })
        steel_swordMerchantTransformButton.addEventListener("click", function(){ peformMerchantTransform(userGUID, 'steel sword'); })
        rifleMerchantTransformButton.addEventListener("click", function(){ peformMerchantTransform(userGUID, 'rifle'); })
        bulletsMerchantTransformButton.addEventListener("click", function(){ peformMerchantTransform(userGUID, 'bullets'); })
        alien_alloyMerchantTransformButton.addEventListener("click", function(){ peformMerchantTransform(userGUID, 'alien alloy'); })
        bolasMerchantTransformButton.addEventListener("click", function(){ peformMerchantTransform(userGUID, 'bolas'); })
        energy_cellMerchantTransformButton.addEventListener("click", function(){ peformMerchantTransform(userGUID, 'energy cell'); })
        laser_rifleMerchantTransformButton.addEventListener("click", function(){ peformMerchantTransform(userGUID, 'laser rifle'); })
        sulphurMerchantTransformButton.addEventListener("click", function(){ peformMerchantTransform(userGUID, 'sulphur'); })
        bayonetMerchantTransformButton.addEventListener("click", function(){ peformMerchantTransform(userGUID, 'bayonet'); })
        grenadeMerchantTransformButton.addEventListener("click", function(){ peformMerchantTransform(userGUID, 'grenade'); })

        if (userGUID == '') {
            if (localStorage.getItem("guid") == null){
                createUser();
            }
            else {
                userGUID = localStorage.getItem("guid");
            }
        }

        // Set the initial state
        UpdateAllTheThings();

        // build the initial ui
        updateUI();

        // set the timer to hanlde future update and refreshes..
        setInterval(UpdateAllTheThings, 1000);

        // user keep alive for in-game character
        setInterval(setUserStatusActive, 5000);
    }
    addEventListener("DOMContentLoaded", initialize);
})(document, navigator);
