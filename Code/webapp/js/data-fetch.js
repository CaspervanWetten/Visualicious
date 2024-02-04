import {setLoading, setData, setMapData, endDateText} from "./index.js";
import {eventEmitter} from "./event-emitter.js";

let globalTSVData = null;

const timeDict = {
    "January 2012": "2012MM01",
    "February 2012": "2012MM02",
    "March 2012": "2012MM03",
    "April 2012": "2012MM04",
    "May 2012": "2012MM05",
    "June 2012": "2012MM06",
    "July 2012": "2012MM07",
    "August 2012": "2012MM08",
    "September 2012": "2012MM09",
    "October 2012": "2012MM10",
    "November 2012": "2012MM11",
    "December 2012": "2012MM12",
    "January 2013": "2013MM01",
    "February 2013": "2013MM02",
    "March 2013": "2013MM03",
    "April 2013": "2013MM04",
    "May 2013": "2013MM05",
    "June 2013": "2013MM06",
    "July 2013": "2013MM07",
    "August 2013": "2013MM08",
    "September 2013": "2013MM09",
    "October 2013": "2013MM10",
    "November 2013": "2013MM11",
    "December 2013": "2013MM12",
    "January 2014": "2014MM01",
    "February 2014": "2014MM02",
    "March 2014": "2014MM03",
    "April 2014": "2014MM04",
    "May 2014": "2014MM05",
    "June 2014": "2014MM06",
    "July 2014": "2014MM07",
    "August 2014": "2014MM08",
    "September 2014": "2014MM09",
    "October 2014": "2014MM10",
    "November 2014": "2014MM11",
    "December 2014": "2014MM12",
    "January 2015": "2015MM01",
    "February 2015": "2015MM02",
    "March 2015": "2015MM03",
    "April 2015": "2015MM04",
    "May 2015": "2015MM05",
    "June 2015": "2015MM06",
    "July 2015": "2015MM07",
    "August 2015": "2015MM08",
    "September 2015": "2015MM09",
    "October 2015": "2015MM10",
    "November 2015": "2015MM11",
    "December 2015": "2015MM12",
    "January 2016": "2016MM01",
    "February 2016": "2016MM02",
    "March 2016": "2016MM03",
    "April 2016": "2016MM04",
    "May 2016": "2016MM05",
    "June 2016": "2016MM06",
    "July 2016": "2016MM07",
    "August 2016": "2016MM08",
    "September 2016": "2016MM09",
    "October 2016": "2016MM10",
    "November 2016": "2016MM11",
    "December 2016": "2016MM12",
    "January 2017": "2017MM01",
    "February 2017": "2017MM02",
    "March 2017": "2017MM03",
    "April 2017": "2017MM04",
    "May 2017": "2017MM05",
    "June 2017": "2017MM06",
    "July 2017": "2017MM07",
    "August 2017": "2017MM08",
    "September 2017": "2017MM09",
    "October 2017": "2017MM10",
    "November 2017": "2017MM11",
    "December 2017": "2017MM12",
    "January 2018": "2018MM01",
    "February 2018": "2018MM02",
    "March 2018": "2018MM03",
    "April 2018": "2018MM04",
    "May 2018": "2018MM05",
    "June 2018": "2018MM06",
    "July 2018": "2018MM07",
    "August 2018": "2018MM08",
    "September 2018": "2018MM09",
    "October 2018": "2018MM10",
    "November 2018": "2018MM11",
    "December 2018": "2018MM12",
    "January 2019": "2019MM01",
    "February 2019": "2019MM02",
    "March 2019": "2019MM03",
    "April 2019": "2019MM04",
    "May 2019": "2019MM05",
    "June 2019": "2019MM06",
    "July 2019": "2019MM07",
    "August 2019": "2019MM08",
    "September 2019": "2019MM09",
    "October 2019": "2019MM10",
    "November 2019": "2019MM11",
    "December 2019": "2019MM12",
    "January 2020": "2020MM01",
    "February 2020": "2020MM02",
    "March 2020": "2020MM03",
    "April 2020": "2020MM04",
    "May 2020": "2020MM05",
    "June 2020": "2020MM06",
    "July 2020": "2020MM07",
    "August 2020": "2020MM08",
    "September 2020": "2020MM09",
    "October 2020": "2020MM10",
    "November 2020": "2020MM11",
    "December 2020": "2020MM12",
    "January 2021": "2021MM01",
    "February 2021": "2021MM02",
    "March 2021": "2021MM03",
    "April 2021": "2021MM04",
    "May 2021": "2021MM05",
    "June 2021": "2021MM06",
    "July 2021": "2021MM07",
    "August 2021": "2021MM08",
    "September 2021": "2021MM09",
    "October 2021": "2021MM10",
    "November 2021": "2021MM11",
    "December 2021": "2021MM12",
    "January 2022": "2022MM01",
    "February 2022": "2022MM02",
    "March 2022": "2022MM03",
    "April 2022": "2022MM04",
    "May 2022": "2022MM05",
    "June 2022": "2022MM06",
    "July 2022": "2022MM07",
    "August 2022": "2022MM08",
    "September 2022": "2022MM09",
    "October 2022": "2022MM10",
    "November 2022": "2022MM11",
    "December 2022": "2022MM12",
    "January 2023": "2023MM01",
    "February 2023": "2023MM02",
    "March 2023": "2023MM03",
    "April 2023": "2023MM04",
    "May 2023": "2023MM05",
    "June 2023": "2023MM06",
    "July 2023": "2023MM07",
    "August 2023": "2023MM08",
    "September 2023": "2023MM09",
    "October 2023": "2023MM10",
    "November 2023": "2023MM11",
    "December 2023": "2023MM12",
}

const dataAreaDict = {'NL00      ': 'Nederland', 'GM1680    ': 'Aa en Hunze', 'GM0358    ': 'Aalsmeer', 'GM0197    ': 'Aalten', 'GM0059    ': 'Achtkarspelen', 'GM0482    ': 'Alblasserdam', 'GM0613    ': 'Albrandswaard', 'GM0361    ': 'Alkmaar', 'GM0141    ': 'Almelo', 'GM0034    ': 'Almere', 'GM0484    ': 'Alphen aan den Rijn', 'GM1723    ': 'Alphen-Chaam', 'GM1959    ': 'Altena', 'GM0060    ': 'Ameland', 'GM0307    ': 'Amersfoort', 'GM0362    ': 'Amstelveen', 'GM0363    ': 'Amsterdam', 'GM0200    ': 'Apeldoorn', 'GM0202    ': 'Arnhem', 'GM0106    ': 'Assen', 'GM0743    ': 'Asten', 'GM0744    ': 'Baarle-Nassau', 'GM0308    ': 'Baarn', 'GM0489    ': 'Barendrecht', 'GM0203    ': 'Barneveld', 'GM0888    ': 'Beek', 'GM1954    ': 'Beekdaelen', 'GM0889    ': 'Beesel', 'GM1945    ': 'Berg en Dal', 'GM1724    ': 'Bergeijk', 'GM0893    ': 'Bergen (L.)', 'GM0373    ': 'Bergen (NH.)', 'GM0748    ': 'Bergen op Zoom', 'GM1859    ': 'Berkelland', 'GM1721    ': 'Bernheze', 'GM0753    ': 'Best', 'GM0209    ': 'Beuningen', 'GM0375    ': 'Beverwijk', 'GM0310    ': 'De Bilt', 'GM1728    ': 'Bladel', 'GM0376    ': 'Blaricum', 'GM0377    ': 'Bloemendaal', 'GM1901    ': 'Bodegraven-Reeuwijk', 'GM0755    ': 'Boekel', 'GM1681    ': 'Borger-Odoorn', 'GM0147    ': 'Borne', 'GM0654    ': 'Borsele', 'GM0757    ': 'Boxtel', 'GM0758    ': 'Breda', 'GM1876    ': 'Bronckhorst', 'GM0213    ': 'Brummen', 'GM0899    ': 'Brunssum', 'GM0312    ': 'Bunnik', 'GM0313    ': 'Bunschoten', 'GM0214    ': 'Buren', 'GM0502    ': 'Capelle aan den IJssel', 'GM0383    ': 'Castricum', 'GM0109    ': 'Coevorden', 'GM1706    ': 'Cranendonck', 'GM0216    ': 'Culemborg', 'GM0148    ': 'Dalfsen', 'GM1891    ': 'Dantumadiel', 'GM0503    ': 'Delft', 'GM0762    ': 'Deurne', 'GM0150    ': 'Deventer', 'GM0384    ': 'Diemen', 'GM1980    ': 'Dijk en Waard', 'GM1774    ': 'Dinkelland', 'GM0221    ': 'Doesburg', 'GM0222    ': 'Doetinchem', 'GM0766    ': 'Dongen', 'GM0505    ': 'Dordrecht', 'GM0498    ': 'Drechterland', 'GM1719    ': 'Drimmelen', 'GM0303    ': 'Dronten', 'GM0225    ': 'Druten', 'GM0226    ': 'Duiven', 'GM1711    ': 'Echt-Susteren', 'GM0385    ': 'Edam-Volendam', 'GM0228    ': 'Ede', 'GM0317    ': 'Eemnes', 'GM1979    ': 'Eemsdelta', 'GM0770    ': 'Eersel', 'GM1903    ': 'Eijsden-Margraten', 'GM0772    ': 'Eindhoven', 'GM0230    ': 'Elburg', 'GM0114    ': 'Emmen', 'GM0388    ': 'Enkhuizen', 'GM0153    ': 'Enschede', 'GM0232    ': 'Epe', 'GM0233    ': 'Ermelo', 'GM0777    ': 'Etten-Leur', 'GM1940    ': 'De Fryske Marren', 'GM0779    ': 'Geertruidenberg', 'GM1771    ': 'Geldrop-Mierlo', 'GM1652    ': 'Gemert-Bakel', 'GM0907    ': 'Gennep', 'GM0784    ': 'Gilze en Rijen', 'GM1924    ': 'Goeree-Overflakkee', 'GM0664    ': 'Goes', 'GM0785    ': 'Goirle', 'GM1942    ': 'Gooise Meren', 'GM0512    ': 'Gorinchem', 'GM0513    ': 'Gouda', 'GM0518    ': "'s-Gravenhage", 'GM0014    ': 'Groningen', 'GM1729    ': 'Gulpen-Wittem', 'GM0158    ': 'Haaksbergen', 'GM0392    ': 'Haarlem', 'GM0394    ': 'Haarlemmermeer', 'GM1655    ': 'Halderberge', 'GM0160    ': 'Hardenberg', 'GM0243    ': 'Harderwijk', 'GM0523    ': 'Hardinxveld-Giessendam', 'GM0072    ': 'Harlingen', 'GM0244    ': 'Hattem', 'GM0396    ': 'Heemskerk', 'GM0397    ': 'Heemstede', 'GM0246    ': 'Heerde', 'GM0074    ': 'Heerenveen', 'GM0917    ': 'Heerlen', 'GM1658    ': 'Heeze-Leende', 'GM0399    ': 'Heiloo', 'GM0400    ': 'Den Helder', 'GM0163    ': 'Hellendoorn', 'GM0794    ': 'Helmond', 'GM0531    ': 'Hendrik-Ido-Ambacht', 'GM0164    ': 'Hengelo', 'GM0796    ': "'s-Hertogenbosch", 'GM0252    ': 'Heumen', 'GM0797    ': 'Heusden', 'GM0534    ': 'Hillegom', 'GM0798    ': 'Hilvarenbeek', 'GM0402    ': 'Hilversum', 'GM1963    ': 'Hoeksche Waard', 'GM1735    ': 'Hof van Twente', 'GM1966    ': 'Het Hogeland', 'GM1911    ': 'Hollands Kroon', 'GM0118    ': 'Hoogeveen', 'GM0405    ': 'Hoorn', 'GM1507    ': 'Horst aan de Maas', 'GM0321    ': 'Houten', 'GM0406    ': 'Huizen', 'GM0677    ': 'Hulst', 'GM0353    ': 'IJsselstein', 'GM1884    ': 'Kaag en Braassem', 'GM0166    ': 'Kampen', 'GM0678    ': 'Kapelle', 'GM0537    ': 'Katwijk', 'GM0928    ': 'Kerkrade', 'GM1598    ': 'Koggenland', 'GM0542    ': 'Krimpen aan den IJssel', 'GM1931    ': 'Krimpenerwaard', 'GM1659    ': 'Laarbeek', 'GM1982    ': 'Land van Cuijk', 'GM0882    ': 'Landgraaf', 'GM0415    ': 'Landsmeer', 'GM1621    ': 'Lansingerland', 'GM0417    ': 'Laren', 'GM0080    ': 'Leeuwarden', 'GM0546    ': 'Leiden', 'GM0547    ': 'Leiderdorp', 'GM1916    ': 'Leidschendam-Voorburg', 'GM0995    ': 'Lelystad', 'GM1640    ': 'Leudal', 'GM0327    ': 'Leusden', 'GM1705    ': 'Lingewaard', 'GM0553    ': 'Lisse', 'GM0262    ': 'Lochem', 'GM0809    ': 'Loon op Zand', 'GM0331    ': 'Lopik', 'GM0168    ': 'Losser', 'GM0263    ': 'Maasdriel', 'GM1641    ': 'Maasgouw', 'GM1991    ': 'Maashorst', 'GM0556    ': 'Maassluis', 'GM0935    ': 'Maastricht', 'GM0420    ': 'Medemblik', 'GM0938    ': 'Meerssen', 'GM1948    ': 'Meierijstad', 'GM0119    ': 'Meppel', 'GM0687    ': 'Middelburg', 'GM1842    ': 'Midden-Delfland', 'GM1731    ': 'Midden-Drenthe', 'GM1952    ': 'Midden-Groningen', 'GM1709    ': 'Moerdijk', 'GM1978    ': 'Molenlanden', 'GM1955    ': 'Montferland', 'GM0335    ': 'Montfoort', 'GM0944    ': 'Mook en Middelaar', 'GM1740    ': 'Neder-Betuwe', 'GM0946    ': 'Nederweert', 'GM0356    ': 'Nieuwegein', 'GM0569    ': 'Nieuwkoop', 'GM0267    ': 'Nijkerk', 'GM0268    ': 'Nijmegen', 'GM1930    ': 'Nissewaard', 'GM1970    ': 'Noardeast-Fryslân', 'GM1695    ': 'Noord-Beveland', 'GM1699    ': 'Noordenveld', 'GM0171    ': 'Noordoostpolder', 'GM0575    ': 'Noordwijk', 'GM0820    ': 'Nuenen, Gerwen en Nederwetten', 'GM0302    ': 'Nunspeet', 'GM0579    ': 'Oegstgeest', 'GM0823    ': 'Oirschot', 'GM0824    ': 'Oisterwijk', 'GM1895    ': 'Oldambt', 'GM0269    ': 'Oldebroek', 'GM0173    ': 'Oldenzaal', 'GM1773    ': 'Olst-Wijhe', 'GM0175    ': 'Ommen', 'GM1586    ': 'Oost Gelre', 'GM0826    ': 'Oosterhout', 'GM0085    ': 'Ooststellingwerf', 'GM0431    ': 'Oostzaan', 'GM0432    ': 'Opmeer', 'GM0086    ': 'Opsterland', 'GM0828    ': 'Oss', 'GM1509    ': 'Oude IJsselstreek', 'GM0437    ': 'Ouder-Amstel', 'GM0589    ': 'Oudewater', 'GM1734    ': 'Overbetuwe', 'GM0590    ': 'Papendrecht', 'GM1894    ': 'Peel en Maas', 'GM0765    ': 'Pekela', 'GM1926    ': 'Pijnacker-Nootdorp', 'GM0439    ': 'Purmerend', 'GM0273    ': 'Putten', 'GM0177    ': 'Raalte', 'GM0703    ': 'Reimerswaal', 'GM0274    ': 'Renkum', 'GM0339    ': 'Renswoude', 'GM1667    ': 'Reusel-De Mierden', 'GM0275    ': 'Rheden', 'GM0340    ': 'Rhenen', 'GM0597    ': 'Ridderkerk', 'GM1742    ': 'Rijssen-Holten', 'GM0603    ': 'Rijswijk', 'GM1669    ': 'Roerdalen', 'GM0957    ': 'Roermond', 'GM0736    ': 'De Ronde Venen', 'GM1674    ': 'Roosendaal', 'GM0599    ': 'Rotterdam', 'GM0277    ': 'Rozendaal', 'GM0840    ': 'Rucphen', 'GM0441    ': 'Schagen', 'GM0279    ': 'Scherpenzeel', 'GM0606    ': 'Schiedam', 'GM0088    ': 'Schiermonnikoog', 'GM1676    ': 'Schouwen-Duiveland', 'GM0965    ': 'Simpelveld', 'GM0845    ': 'Sint-Michielsgestel', 'GM1883    ': 'Sittard-Geleen', 'GM0610    ': 'Sliedrecht', 'GM1714    ': 'Sluis', 'GM0090    ': 'Smallingerland', 'GM0342    ': 'Soest', 'GM0847    ': 'Someren', 'GM0848    ': 'Son en Breugel', 'GM0037    ': 'Stadskanaal', 'GM0180    ': 'Staphorst', 'GM0532    ': 'Stede Broec', 'GM0851    ': 'Steenbergen', 'GM1708    ': 'Steenwijkerland', 'GM0971    ': 'Stein', 'GM1904    ': 'Stichtse Vecht', 'GM1900    ': 'Súdwest-Fryslân', 'GM0715    ': 'Terneuzen', 'GM0093    ': 'Terschelling', 'GM0448    ': 'Texel', 'GM1525    ': 'Teylingen', 'GM0716    ': 'Tholen', 'GM0281    ': 'Tiel', 'GM0855    ': 'Tilburg', 'GM0183    ': 'Tubbergen', 'GM1700    ': 'Twenterand', 'GM1730    ': 'Tynaarlo', 'GM0737    ': 'Tytsjerksteradiel', 'GM0450    ': 'Uitgeest', 'GM0451    ': 'Uithoorn', 'GM0184    ': 'Urk', 'GM0344    ': 'Utrecht', 'GM1581    ': 'Utrechtse Heuvelrug', 'GM0981    ': 'Vaals', 'GM0994    ': 'Valkenburg aan de Geul', 'GM0858    ': 'Valkenswaard', 'GM0047    ': 'Veendam', 'GM0345    ': 'Veenendaal', 'GM0717    ': 'Veere', 'GM0861    ': 'Veldhoven', 'GM0453    ': 'Velsen', 'GM0983    ': 'Venlo', 'GM0984    ': 'Venray', 'GM1961    ': 'Vijfheerenlanden', 'GM0622    ': 'Vlaardingen', 'GM0096    ': 'Vlieland', 'GM0718    ': 'Vlissingen', 'GM0986    ': 'Voerendaal', 'GM1992    ': 'Voorne aan Zee', 'GM0626    ': 'Voorschoten', 'GM0285    ': 'Voorst', 'GM0865    ': 'Vught', 'GM1949    ': 'Waadhoeke', 'GM0866    ': 'Waalre', 'GM0867    ': 'Waalwijk', 'GM0627    ': 'Waddinxveen', 'GM0289    ': 'Wageningen', 'GM0629    ': 'Wassenaar', 'GM0852    ': 'Waterland', 'GM0988    ': 'Weert', 'GM1960    ': 'West Betuwe', 'GM0668    ': 'West Maas en Waal', 'GM1969    ': 'Westerkwartier', 'GM1701    ': 'Westerveld', 'GM0293    ': 'Westervoort', 'GM1950    ': 'Westerwolde', 'GM1783    ': 'Westland', 'GM0098    ': 'Weststellingwerf', 'GM0189    ': 'Wierden', 'GM0296    ': 'Wijchen', 'GM1696    ': 'Wijdemeren', 'GM0352    ': 'Wijk bij Duurstede', 'GM0294    ': 'Winterswijk', 'GM0873    ': 'Woensdrecht', 'GM0632    ': 'Woerden', 'GM1690    ': 'De Wolden', 'GM0880    ': 'Wormerland', 'GM0351    ': 'Woudenberg', 'GM0479    ': 'Zaanstad', 'GM0297    ': 'Zaltbommel', 'GM0473    ': 'Zandvoort', 'GM0050    ': 'Zeewolde', 'GM0355    ': 'Zeist', 'GM0299    ': 'Zevenaar', 'GM0637    ': 'Zoetermeer', 'GM0638    ': 'Zoeterwoude', 'GM1892    ': 'Zuidplas', 'GM0879    ': 'Zundert', 'GM0301    ': 'Zutphen', 'GM1896    ': 'Zwartewaterland', 'GM0642    ': 'Zwijndrecht', 'GM0193    ': 'Zwolle', 'GM0000    ': 'Gemeente onbekend'};

export function getDateCodeList(startDate, endDate) {
    const dateCodeList = [];
    let addToList = false;

    for (const key in timeDict) {
        if (timeDict[key] === startDate) {
            addToList = true;
        }
        if (addToList) {
            dateCodeList.push(timeDict[key]);
        }
        if (timeDict[key] === endDate) {
            break;
        }
    }

    return dateCodeList;
}

async function fetchTSVData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const tsvData = await response.text();
      
      // Split the TSV data into lines
      const lines = tsvData.split('\n');
      
      // Initialize an empty array to store the objects
      const data = [];
      
      // Extract column names from the first line (assuming the first line contains headers)
      const headers = lines[0].split('\t');
      
      // Iterate over the remaining lines
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split('\t');
        const obj = {};
        
        // Create an object for each line, using column names as keys
        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = values[j];
        }
        
        data.push(obj);
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching and parsing TSV data:', error);
      return null;
    }
  }

  export async function fetchDataAndProcess(startDate, endDate, regionCode, crimeCodeList, wait = 200) {
    // Add your code to do something before calling the function here

    // Find the regionKey that contains the provided regionCode
    const regionKey = Object.keys(dataAreaDict).find(key => dataAreaDict[key].includes(regionCode));

    if (!regionKey) {
        console.error(`Region code '${regionCode}' not found in the dataAreaDict dictionary.`);
        setLoading(false);
        return;
    }

    // Remove trailing and leading spaces from regionKey
    const trimmedRegionKey = regionKey.trim();

    if (crimeCodeList.includes("0.0.0")) {
        // Execute this block of code when "0.0.0" is in crimeCodeList
        crimeCodeList = ["1.1.1", "1.1.2", "1.2.1", "1.2.2", "1.2.3", "1.2.4", "1.2.5", "1.4.6", "1.4.7", "1.5.2", "2.5.1", "2.5.2"];
    }
    

    let crimeRange = crimeCodeList.map(crime => `"${crime}"`).join(',');

    // Construct the tsvUrl using the trimmedRegionKey and other provided parameters
    const tsvUrl = `https://visualicious.bjornkoemans.nl/data.php?area=${trimmedRegionKey}&start=${startDate}&end=${endDate}&crime=[${crimeRange}]`;

    // Delay for 1000ms (1 second)
    await new Promise(resolve => setTimeout(resolve, wait));

    // Call the fetchTSVData function
    const responseData = await fetchTSVData(tsvUrl);

    // Add your code to do something after the function finishes here
    if (responseData) {
        setData(responseData);
    } else {
        console.log('Failed to fetch TSV data.');
    }
}

export async function fetchMapDataAndProcess(startDate, endDate, crimeCodeList, wait = 200) {
    // Add your code to do something before calling the function here

    if (crimeCodeList.includes("0.0.0")) {
        // Execute this block of code when "0.0.0" is in crimeCodeList
        crimeCodeList = ["1.1.1", "1.1.2", "1.2.1", "1.2.2", "1.2.3", "1.2.4", "1.2.5", "1.4.6", "1.4.7", "1.5.2", "2.5.1", "2.5.2"];
    }
    
    let crimeRange = crimeCodeList.map(crime => `"${crime}"`).join(',');

    // Construct the tsvUrl using the trimmedRegionKey and other provided parameters
    const tsvUrl = `https://visualicious.bjornkoemans.nl/mapdata.php?start=${startDate}&end=${endDate}&crime=[${crimeRange}]`;

    // Delay for 1000ms (1 second)
    await new Promise(resolve => setTimeout(resolve, wait));

    // Call the fetchTSVData function
    const responseData = await fetchTSVData(tsvUrl);

    // Add your code to do something after the function finishes here
    if (responseData) {
        setMapData(responseData);
    } else {
        console.log('Failed to fetch TSV data.');
    }
}


export async function fetchDataAndMapData(startDate, endDate, regionCode, crimeCodeList, wait = 200) {
    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, wait));

    const fetchDataPromise = fetchDataAndProcess(startDate, endDate, regionCode, crimeCodeList);
    const fetchMapDataPromise = fetchMapDataAndProcess(startDate, endDate, crimeCodeList);

    // Wait for both promises to complete
    await Promise.all([fetchDataPromise, fetchMapDataPromise]);

    // Both functions have finished loading, set loading to false
    setLoading(false);
}


window.onload = () => {
    fetchDataAndMapData("2012MM01", "2023MM12", "Nederland", ["0.0.0"]);
};

