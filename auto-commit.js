var exec = require('child_process').execSync;
var fs   = require('fs');

// -------------------------------------------------------
// PODESAVANJA
// -------------------------------------------------------
var FOLDER        = 'C:\\Users\\David\\Desktop\\polovni-auto';
var HTML          = FOLDER + '\\index.html';
var CSS           = FOLDER + '\\style.css';
var PROGRES       = FOLDER + '\\progres.json';
var GITHUB_PROFIL = 'https://github.com/lazicddavid';

// -------------------------------------------------------
// BAZA AUTOMOBILA  (20 marki x 5 modela = 100 automobila)
// -------------------------------------------------------
var automobili = [
  { id:1,  marka:'Volkswagen', model:'Golf 6',         g:[2009,2013], km:[80000,200000],  cena:[6500,11000],  gorivo:'Dizel',   mjenjac:'Manuelni',  boja:'Siva'         },
  { id:2,  marka:'Volkswagen', model:'Golf 7',         g:[2013,2019], km:[60000,160000],  cena:[10000,17000], gorivo:'Dizel',   mjenjac:'Manuelni',  boja:'Crna'         },
  { id:3,  marka:'Volkswagen', model:'Passat B6',      g:[2005,2010], km:[150000,280000], cena:[4500,8000],   gorivo:'Dizel',   mjenjac:'Manuelni',  boja:'Srebrna'      },
  { id:4,  marka:'Volkswagen', model:'Passat B8',      g:[2014,2020], km:[60000,150000],  cena:[14000,22000], gorivo:'Dizel',   mjenjac:'DSG',       boja:'Bela'         },
  { id:5,  marka:'Volkswagen', model:'Tiguan',         g:[2011,2019], km:[70000,180000],  cena:[10000,22000], gorivo:'Dizel',   mjenjac:'DSG',       boja:'Siva'         },
  { id:6,  marka:'BMW',        model:'Serija 3 E90',   g:[2005,2012], km:[120000,250000], cena:[5000,12000],  gorivo:'Dizel',   mjenjac:'Manuelni',  boja:'Crna'         },
  { id:7,  marka:'BMW',        model:'Serija 3 F30',   g:[2012,2018], km:[80000,180000],  cena:[11000,20000], gorivo:'Dizel',   mjenjac:'Automatik', boja:'Siva'         },
  { id:8,  marka:'BMW',        model:'Serija 5 E60',   g:[2003,2010], km:[150000,300000], cena:[4000,9000],   gorivo:'Dizel',   mjenjac:'Automatik', boja:'Srebrna'      },
  { id:9,  marka:'BMW',        model:'X5 E70',         g:[2007,2013], km:[130000,260000], cena:[8000,16000],  gorivo:'Dizel',   mjenjac:'Automatik', boja:'Crna'         },
  { id:10, marka:'BMW',        model:'Serija 1 E87',   g:[2006,2011], km:[100000,220000], cena:[4500,8500],   gorivo:'Benzin',  mjenjac:'Manuelni',  boja:'Bela'         },
  { id:11, marka:'Mercedes',   model:'C-klasa W204',   g:[2007,2014], km:[100000,230000], cena:[7000,15000],  gorivo:'Dizel',   mjenjac:'Automatik', boja:'Crna'         },
  { id:12, marka:'Mercedes',   model:'E-klasa W211',   g:[2002,2009], km:[150000,320000], cena:[4000,9000],   gorivo:'Dizel',   mjenjac:'Automatik', boja:'Srebrna'      },
  { id:13, marka:'Mercedes',   model:'E-klasa W212',   g:[2009,2016], km:[100000,220000], cena:[10000,22000], gorivo:'Dizel',   mjenjac:'Automatik', boja:'Crna'         },
  { id:14, marka:'Mercedes',   model:'A-klasa W176',   g:[2012,2018], km:[70000,170000],  cena:[9000,17000],  gorivo:'Dizel',   mjenjac:'Automatik', boja:'Bela'         },
  { id:15, marka:'Mercedes',   model:'GLC',            g:[2015,2021], km:[50000,140000],  cena:[22000,40000], gorivo:'Dizel',   mjenjac:'Automatik', boja:'Siva'         },
  { id:16, marka:'Audi',       model:'A3 8P',          g:[2003,2012], km:[120000,250000], cena:[4000,8500],   gorivo:'Dizel',   mjenjac:'Manuelni',  boja:'Srebrna'      },
  { id:17, marka:'Audi',       model:'A4 B8',          g:[2008,2016], km:[100000,220000], cena:[7000,15000],  gorivo:'Dizel',   mjenjac:'Manuelni',  boja:'Crna'         },
  { id:18, marka:'Audi',       model:'A6 C7',          g:[2011,2018], km:[100000,220000], cena:[12000,24000], gorivo:'Dizel',   mjenjac:'Automatik', boja:'Bela'         },
  { id:19, marka:'Audi',       model:'Q5',             g:[2008,2016], km:[100000,230000], cena:[11000,22000], gorivo:'Dizel',   mjenjac:'Automatik', boja:'Siva'         },
  { id:20, marka:'Audi',       model:'Q3',             g:[2011,2018], km:[70000,180000],  cena:[10000,20000], gorivo:'Dizel',   mjenjac:'Manuelni',  boja:'Crna'         },
  { id:21, marka:'Opel',       model:'Astra H',        g:[2004,2010], km:[130000,260000], cena:[2500,5500],   gorivo:'Dizel',   mjenjac:'Manuelni',  boja:'Crvena'       },
  { id:22, marka:'Opel',       model:'Astra J',        g:[2009,2015], km:[100000,220000], cena:[4500,9000],   gorivo:'Dizel',   mjenjac:'Manuelni',  boja:'Siva'         },
  { id:23, marka:'Opel',       model:'Corsa D',        g:[2006,2014], km:[80000,200000],  cena:[2000,4500],   gorivo:'Benzin',  mjenjac:'Manuelni',  boja:'Bela'         },
  { id:24, marka:'Opel',       model:'Insignia',       g:[2008,2017], km:[100000,230000], cena:[5000,11000],  gorivo:'Dizel',   mjenjac:'Automatik', boja:'Srebrna'      },
  { id:25, marka:'Opel',       model:'Mokka',          g:[2012,2019], km:[60000,170000],  cena:[7000,14000],  gorivo:'Dizel',   mjenjac:'Manuelni',  boja:'Crna'         },
  { id:26, marka:'Renault',    model:'Clio 3',         g:[2005,2012], km:[100000,230000], cena:[2000,4500],   gorivo:'Benzin',  mjenjac:'Manuelni',  boja:'Plava'        },
  { id:27, marka:'Renault',    model:'Megane 3',       g:[2008,2015], km:[100000,220000], cena:[3500,7500],   gorivo:'Dizel',   mjenjac:'Manuelni',  boja:'Siva'         },
  { id:28, marka:'Renault',    model:'Laguna 3',       g:[2007,2015], km:[120000,260000], cena:[3000,7000],   gorivo:'Dizel',   mjenjac:'Automatik', boja:'Srebrna'      },
  { id:29, marka:'Renault',    model:'Kadjar',         g:[2015,2021], km:[40000,130000],  cena:[10000,18000], gorivo:'Dizel',   mjenjac:'Manuelni',  boja:'Bela'         },
  { id:30, marka:'Renault',    model:'Captur',         g:[2013,2020], km:[50000,150000],  cena:[8000,15000],  gorivo:'Benzin',  mjenjac:'Automatik', boja:'Narandzasta'  },
  { id:31, marka:'Peugeot',    model:'207',            g:[2006,2012], km:[90000,210000],  cena:[2000,4500],   gorivo:'Benzin',  mjenjac:'Manuelni',  boja:'Crvena'       },
  { id:32, marka:'Peugeot',    model:'308 I',          g:[2007,2013], km:[100000,230000], cena:[3500,7000],   gorivo:'Dizel',   mjenjac:'Manuelni',  boja:'Srebrna'      },
  { id:33, marka:'Peugeot',    model:'308 II',         g:[2013,2021], km:[60000,160000],  cena:[7000,15000],  gorivo:'Dizel',   mjenjac:'Manuelni',  boja:'Crna'         },
  { id:34, marka:'Peugeot',    model:'3008',           g:[2016,2022], km:[40000,130000],  cena:[14000,25000], gorivo:'Dizel',   mjenjac:'Automatik', boja:'Siva'         },
  { id:35, marka:'Peugeot',    model:'508',            g:[2011,2018], km:[100000,220000], cena:[7000,14000],  gorivo:'Dizel',   mjenjac:'Automatik', boja:'Bela'         },
  { id:36, marka:'Ford',       model:'Focus 2',        g:[2004,2011], km:[130000,270000], cena:[2500,5500],   gorivo:'Dizel',   mjenjac:'Manuelni',  boja:'Plava'        },
  { id:37, marka:'Ford',       model:'Focus 3',        g:[2011,2018], km:[80000,200000],  cena:[6000,12000],  gorivo:'Dizel',   mjenjac:'Manuelni',  boja:'Bela'         },
  { id:38, marka:'Ford',       model:'Fiesta',         g:[2008,2017], km:[70000,190000],  cena:[3000,7000],   gorivo:'Benzin',  mjenjac:'Manuelni',  boja:'Crvena'       },
  { id:39, marka:'Ford',       model:'Mondeo',         g:[2007,2015], km:[120000,250000], cena:[4000,9000],   gorivo:'Dizel',   mjenjac:'Automatik', boja:'Srebrna'      },
  { id:40, marka:'Ford',       model:'Kuga',           g:[2008,2017], km:[80000,200000],  cena:[8000,17000],  gorivo:'Dizel',   mjenjac:'Automatik', boja:'Siva'         },
  { id:41, marka:'Toyota',     model:'Corolla E120',   g:[2002,2007], km:[150000,300000], cena:[3000,6000],   gorivo:'Benzin',  mjenjac:'Manuelni',  boja:'Srebrna'      },
  { id:42, marka:'Toyota',     model:'Corolla E150',   g:[2006,2014], km:[100000,230000], cena:[5500,11000],  gorivo:'Benzin',  mjenjac:'Automatik', boja:'Bela'         },
  { id:43, marka:'Toyota',     model:'Yaris',          g:[2005,2017], km:[80000,200000],  cena:[3500,9000],   gorivo:'Benzin',  mjenjac:'Manuelni',  boja:'Plava'        },
  { id:44, marka:'Toyota',     model:'RAV4',           g:[2006,2018], km:[100000,220000], cena:[9000,22000],  gorivo:'Benzin',  mjenjac:'Automatik', boja:'Siva'         },
  { id:45, marka:'Toyota',     model:'Prius',          g:[2009,2016], km:[100000,220000], cena:[7000,13000],  gorivo:'Hibrid',  mjenjac:'Automatik', boja:'Bela'         },
  { id:46, marka:'Hyundai',    model:'i30 I',          g:[2007,2012], km:[100000,230000], cena:[3500,7000],   gorivo:'Dizel',   mjenjac:'Manuelni',  boja:'Srebrna'      },
  { id:47, marka:'Hyundai',    model:'i30 II',         g:[2012,2017], km:[70000,180000],  cena:[7000,13000],  gorivo:'Dizel',   mjenjac:'Manuelni',  boja:'Bela'         },
  { id:48, marka:'Hyundai',    model:'i20',            g:[2008,2018], km:[70000,190000],  cena:[3000,8000],   gorivo:'Benzin',  mjenjac:'Manuelni',  boja:'Crvena'       },
  { id:49, marka:'Hyundai',    model:'Tucson',         g:[2004,2015], km:[120000,250000], cena:[5000,13000],  gorivo:'Dizel',   mjenjac:'Automatik', boja:'Siva'         },
  { id:50, marka:'Hyundai',    model:'ix35',           g:[2010,2017], km:[80000,200000],  cena:[7000,15000],  gorivo:'Dizel',   mjenjac:'Manuelni',  boja:'Crna'         },
  { id:51, marka:'Kia',        model:'Ceed I',         g:[2007,2012], km:[100000,230000], cena:[3000,6500],   gorivo:'Dizel',   mjenjac:'Manuelni',  boja:'Siva'         },
  { id:52, marka:'Kia',        model:'Ceed II',        g:[2012,2018], km:[70000,180000],  cena:[6000,12000],  gorivo:'Dizel',   mjenjac:'Manuelni',  boja:'Bela'         },
  { id:53, marka:'Kia',        model:'Sportage',       g:[2010,2019], km:[80000,200000],  cena:[7000,18000],  gorivo:'Dizel',   mjenjac:'Automatik', boja:'Crna'         },
  { id:54, marka:'Kia',        model:'Rio',            g:[2005,2017], km:[80000,210000],  cena:[2500,7000],   gorivo:'Benzin',  mjenjac:'Manuelni',  boja:'Crvena'       },
  { id:55, marka:'Kia',        model:'Picanto',        g:[2004,2017], km:[70000,190000],  cena:[2000,5500],   gorivo:'Benzin',  mjenjac:'Manuelni',  boja:'Narandzasta'  },
  { id:56, marka:'Skoda',      model:'Octavia II',     g:[2004,2013], km:[130000,280000], cena:[4000,9000],   gorivo:'Dizel',   mjenjac:'Manuelni',  boja:'Srebrna'      },
  { id:57, marka:'Skoda',      model:'Octavia III',    g:[2013,2020], km:[60000,160000],  cena:[9000,18000],  gorivo:'Dizel',   mjenjac:'DSG',       boja:'Bela'         },
  { id:58, marka:'Skoda',      model:'Fabia II',       g:[2007,2014], km:[80000,200000],  cena:[2500,5500],   gorivo:'Benzin',  mjenjac:'Manuelni',  boja:'Plava'        },
  { id:59, marka:'Skoda',      model:'Superb II',      g:[2008,2015], km:[120000,250000], cena:[6000,13000],  gorivo:'Dizel',   mjenjac:'DSG',       boja:'Crna'         },
  { id:60, marka:'Skoda',      model:'Kodiaq',         g:[2016,2022], km:[40000,130000],  cena:[18000,32000], gorivo:'Dizel',   mjenjac:'DSG',       boja:'Siva'         },
  { id:61, marka:'Seat',       model:'Ibiza IV',       g:[2008,2017], km:[80000,210000],  cena:[3000,7000],   gorivo:'Benzin',  mjenjac:'Manuelni',  boja:'Bela'         },
  { id:62, marka:'Seat',       model:'Leon II',        g:[2005,2012], km:[120000,250000], cena:[3500,7500],   gorivo:'Dizel',   mjenjac:'Manuelni',  boja:'Srebrna'      },
  { id:63, marka:'Seat',       model:'Leon III',       g:[2012,2019], km:[70000,180000],  cena:[7000,14000],  gorivo:'Dizel',   mjenjac:'DSG',       boja:'Crna'         },
  { id:64, marka:'Seat',       model:'Ateca',          g:[2016,2022], km:[40000,130000],  cena:[14000,25000], gorivo:'Dizel',   mjenjac:'DSG',       boja:'Siva'         },
  { id:65, marka:'Seat',       model:'Arona',          g:[2017,2022], km:[30000,100000],  cena:[12000,20000], gorivo:'Benzin',  mjenjac:'Manuelni',  boja:'Plava'        },
  { id:66, marka:'Fiat',       model:'Punto III',      g:[2005,2012], km:[100000,240000], cena:[1800,4000],   gorivo:'Benzin',  mjenjac:'Manuelni',  boja:'Crvena'       },
  { id:67, marka:'Fiat',       model:'Bravo II',       g:[2007,2014], km:[100000,220000], cena:[3000,6500],   gorivo:'Dizel',   mjenjac:'Manuelni',  boja:'Srebrna'      },
  { id:68, marka:'Fiat',       model:'500',            g:[2007,2018], km:[60000,170000],  cena:[4000,9000],   gorivo:'Benzin',  mjenjac:'Manuelni',  boja:'Bela'         },
  { id:69, marka:'Fiat',       model:'Tipo',           g:[2015,2021], km:[40000,130000],  cena:[7000,13000],  gorivo:'Dizel',   mjenjac:'Manuelni',  boja:'Siva'         },
  { id:70, marka:'Fiat',       model:'Doblo',          g:[2006,2017], km:[150000,300000], cena:[3000,8000],   gorivo:'Dizel',   mjenjac:'Manuelni',  boja:'Bela'         },
  { id:71, marka:'Honda',      model:'Civic VIII',     g:[2005,2011], km:[120000,250000], cena:[4000,8000],   gorivo:'Benzin',  mjenjac:'Manuelni',  boja:'Crvena'       },
  { id:72, marka:'Honda',      model:'Civic IX',       g:[2011,2017], km:[70000,180000],  cena:[7500,14000],  gorivo:'Benzin',  mjenjac:'Manuelni',  boja:'Bela'         },
  { id:73, marka:'Honda',      model:'CR-V III',       g:[2006,2012], km:[130000,250000], cena:[6000,12000],  gorivo:'Benzin',  mjenjac:'Automatik', boja:'Srebrna'      },
  { id:74, marka:'Honda',      model:'Jazz II',        g:[2008,2015], km:[80000,200000],  cena:[4000,9000],   gorivo:'Benzin',  mjenjac:'Manuelni',  boja:'Plava'        },
  { id:75, marka:'Honda',      model:'HR-V',           g:[2015,2021], km:[40000,130000],  cena:[11000,19000], gorivo:'Benzin',  mjenjac:'Automatik', boja:'Crna'         },
  { id:76, marka:'Nissan',     model:'Qashqai I',      g:[2007,2013], km:[100000,230000], cena:[6000,13000],  gorivo:'Dizel',   mjenjac:'Manuelni',  boja:'Srebrna'      },
  { id:77, marka:'Nissan',     model:'Qashqai II',     g:[2013,2021], km:[50000,160000],  cena:[10000,22000], gorivo:'Dizel',   mjenjac:'Automatik', boja:'Bela'         },
  { id:78, marka:'Nissan',     model:'Micra K12',      g:[2003,2010], km:[80000,210000],  cena:[2000,4500],   gorivo:'Benzin',  mjenjac:'Manuelni',  boja:'Zuta'         },
  { id:79, marka:'Nissan',     model:'Juke',           g:[2010,2019], km:[60000,180000],  cena:[6000,14000],  gorivo:'Benzin',  mjenjac:'Manuelni',  boja:'Narandzasta'  },
  { id:80, marka:'Nissan',     model:'X-Trail T31',    g:[2007,2014], km:[100000,230000], cena:[8000,17000],  gorivo:'Dizel',   mjenjac:'Automatik', boja:'Siva'         },
  { id:81, marka:'Mazda',      model:'3 BK',           g:[2004,2009], km:[130000,270000], cena:[3000,6000],   gorivo:'Benzin',  mjenjac:'Manuelni',  boja:'Crvena'       },
  { id:82, marka:'Mazda',      model:'3 BL',           g:[2009,2013], km:[100000,220000], cena:[5000,10000],  gorivo:'Benzin',  mjenjac:'Manuelni',  boja:'Siva'         },
  { id:83, marka:'Mazda',      model:'6 GH',           g:[2008,2013], km:[100000,230000], cena:[5000,11000],  gorivo:'Dizel',   mjenjac:'Automatik', boja:'Bela'         },
  { id:84, marka:'Mazda',      model:'CX-5',           g:[2012,2020], km:[60000,180000],  cena:[12000,24000], gorivo:'Dizel',   mjenjac:'Automatik', boja:'Crna'         },
  { id:85, marka:'Mazda',      model:'2 DE',           g:[2007,2015], km:[80000,210000],  cena:[2500,6000],   gorivo:'Benzin',  mjenjac:'Manuelni',  boja:'Plava'        },
  { id:86, marka:'Volvo',      model:'V40',            g:[2012,2019], km:[70000,180000],  cena:[9000,18000],  gorivo:'Dizel',   mjenjac:'Manuelni',  boja:'Srebrna'      },
  { id:87, marka:'Volvo',      model:'V60 I',          g:[2010,2018], km:[100000,220000], cena:[8000,18000],  gorivo:'Dizel',   mjenjac:'Automatik', boja:'Crna'         },
  { id:88, marka:'Volvo',      model:'S60 II',         g:[2010,2018], km:[100000,220000], cena:[8000,17000],  gorivo:'Dizel',   mjenjac:'Automatik', boja:'Bela'         },
  { id:89, marka:'Volvo',      model:'XC60 I',         g:[2008,2017], km:[100000,230000], cena:[12000,25000], gorivo:'Dizel',   mjenjac:'Automatik', boja:'Siva'         },
  { id:90, marka:'Volvo',      model:'XC90 I',         g:[2002,2014], km:[150000,300000], cena:[8000,18000],  gorivo:'Dizel',   mjenjac:'Automatik', boja:'Crna'         },
  { id:91, marka:'Citroen',    model:'C3 I',           g:[2002,2009], km:[100000,240000], cena:[1800,4000],   gorivo:'Benzin',  mjenjac:'Manuelni',  boja:'Zelena'       },
  { id:92, marka:'Citroen',    model:'C4 I',           g:[2004,2011], km:[120000,250000], cena:[3000,6500],   gorivo:'Dizel',   mjenjac:'Manuelni',  boja:'Srebrna'      },
  { id:93, marka:'Citroen',    model:'C5 II',          g:[2008,2017], km:[120000,260000], cena:[4000,9000],   gorivo:'Dizel',   mjenjac:'Automatik', boja:'Crna'         },
  { id:94, marka:'Citroen',    model:'Berlingo II',    g:[2008,2018], km:[150000,320000], cena:[4000,10000],  gorivo:'Dizel',   mjenjac:'Manuelni',  boja:'Bela'         },
  { id:95, marka:'Citroen',    model:'C3 II',          g:[2009,2016], km:[80000,200000],  cena:[3500,8000],   gorivo:'Benzin',  mjenjac:'Manuelni',  boja:'Plava'        },
  { id:96, marka:'Mitsubishi', model:'Outlander II',   g:[2006,2012], km:[130000,270000], cena:[5000,12000],  gorivo:'Dizel',   mjenjac:'Automatik', boja:'Srebrna'      },
  { id:97, marka:'Mitsubishi', model:'ASX',            g:[2010,2020], km:[80000,200000],  cena:[8000,18000],  gorivo:'Benzin',  mjenjac:'Manuelni',  boja:'Bela'         },
  { id:98, marka:'Mitsubishi', model:'Lancer IX',      g:[2003,2012], km:[120000,260000], cena:[3000,7000],   gorivo:'Benzin',  mjenjac:'Manuelni',  boja:'Crvena'       },
  { id:99, marka:'Mitsubishi', model:'Colt VI',        g:[2004,2012], km:[100000,230000], cena:[2000,5000],   gorivo:'Benzin',  mjenjac:'Manuelni',  boja:'Plava'        },
  { id:100,marka:'Mitsubishi', model:'Eclipse Cross',  g:[2017,2022], km:[20000,80000],   cena:[18000,30000], gorivo:'Benzin',  mjenjac:'Automatik', boja:'Crna'         }
];

// -------------------------------------------------------
// POMOCNE FUNKCIJE
// -------------------------------------------------------

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function git(komanda) {
    exec(komanda, { cwd: FOLDER });
}

function commit(poruka) {
    git('git add -A');
    git('git commit -m "' + poruka + '"');
    console.log('  [+] ' + poruka);
}

function ucitajProgres() {
    return JSON.parse(fs.readFileSync(PROGRES, 'utf8'));
}

function sacuvajProgres(p) {
    fs.writeFileSync(PROGRES, JSON.stringify(p, null, 2));
}

function napraviKarticu(auto) {
    var godiste  = rand(auto.g[0],   auto.g[1]);
    var km       = rand(auto.km[0],  auto.km[1]);
    var cena     = rand(auto.cena[0],auto.cena[1]);
    var kmFmt    = km.toLocaleString('de-DE');
    var cenaFmt  = cena.toLocaleString('de-DE');
    return (
        '<div class="auto-kartica">\n' +
        '  <div class="auto-slika-wrap"><span class="auto-emoji">&#128663;</span><span class="auto-label">' + auto.marka + '</span></div>\n' +
        '  <div class="auto-info">\n' +
        '    <div class="auto-naslov">' + auto.marka + ' ' + auto.model + '</div>\n' +
        '    <div class="auto-cena">' + cenaFmt + ' &euro;</div>\n' +
        '    <div class="auto-detalji">\n' +
        '      <span class="chip">&#128197; ' + godiste + '</span>\n' +
        '      <span class="chip">&#128204; ' + kmFmt + ' km</span>\n' +
        '      <span class="chip">&#9981; '   + auto.gorivo  + '</span>\n' +
        '      <span class="chip">&#9881; '   + auto.mjenjac + '</span>\n' +
        '      <span class="chip">&#127912; ' + auto.boja    + '</span>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '</div>\n'
    );
}

function dodajAuto(auto) {
    var html    = fs.readFileSync(HTML, 'utf8');
    var kartica = napraviKarticu(auto);
    html = html.replace('<!-- KRAJ_AUTOMOBILA -->', kartica + '            <!-- KRAJ_AUTOMOBILA -->');
    var brOglasa = (html.match(/auto-kartica/g) || []).length;
    html = html.replace(/id="brOglasa">\d+/, 'id="brOglasa">' + brOglasa);
    fs.writeFileSync(HTML, html);
}

// -------------------------------------------------------
// POOL CSS/HTML IZMENA (svaka = 1 commit)
// -------------------------------------------------------
var izmene = [
    function() {
        var boje = ['#e8a020','#f0a500','#d49010','#f5b100','#c49000'];
        var css  = fs.readFileSync(CSS, 'utf8');
        css = css.replace(/\.auto-cena \{[^}]*color:[^;]+;/, function(m) {
            return m.replace(/color:[^;]+/, 'color: ' + boje[rand(0, boje.length-1)]);
        });
        fs.writeFileSync(CSS, css);
        commit('update price color accent');
    },
    function() {
        var radii = ['6px','8px','10px','12px'];
        var css   = fs.readFileSync(CSS, 'utf8');
        css = css.replace(/\.auto-kartica \{[^}]*border-radius:[^;]+;/, function(m) {
            return m.replace(/border-radius:[^;]+/, 'border-radius: ' + radii[rand(0, radii.length-1)]);
        });
        fs.writeFileSync(CSS, css);
        commit('adjust card border radius');
    },
    function() {
        var gaps = ['1rem','1.2rem','1.5rem','1.8rem','2rem'];
        var css  = fs.readFileSync(CSS, 'utf8');
        css = css.replace(/\.automobili-grid \{[^}]*gap:[^;]+;/, function(m) {
            return m.replace(/gap:[^;]+/, 'gap: ' + gaps[rand(0, gaps.length-1)]);
        });
        fs.writeFileSync(CSS, css);
        commit('update grid gap spacing');
    },
    function() {
        var sene = ['0 2px 8px rgba(0,0,0,0.1)','0 4px 12px rgba(0,0,0,0.12)','0 2px 6px rgba(0,0,0,0.08)','0 3px 10px rgba(0,0,0,0.15)'];
        var css  = fs.readFileSync(CSS, 'utf8');
        css = css.replace(/\.auto-kartica \{[^}]*box-shadow:[^;]+;/, function(m) {
            return m.replace(/box-shadow:[^;]+/, 'box-shadow: ' + sene[rand(0, sene.length-1)]);
        });
        fs.writeFileSync(CSS, css);
        commit('adjust card box shadow');
    },
    function() {
        var padovi = ['4rem','4.5rem','5rem','5.5rem','6rem'];
        var css    = fs.readFileSync(CSS, 'utf8');
        css = css.replace(/\.hero \{[^}]*padding:[^;]+;/, function(m) {
            return m.replace(/padding:[^;]+/, 'padding: ' + padovi[rand(0, padovi.length-1)] + ' 2rem');
        });
        fs.writeFileSync(CSS, css);
        commit('update hero section padding');
    },
    function() {
        var vel = ['2rem','2.1rem','2.2rem','2.3rem','1.9rem'];
        var css = fs.readFileSync(CSS, 'utf8');
        css = css.replace(/\.hero h1 \{[^}]*font-size:[^;]+;/, function(m) {
            return m.replace(/font-size:[^;]+/, 'font-size: ' + vel[rand(0, vel.length-1)]);
        });
        fs.writeFileSync(CSS, css);
        commit('adjust hero title font size');
    },
    function() {
        var boje = ['#0d2137','#0a1c2e','#102840','#0f2233','#0c1e35'];
        var css  = fs.readFileSync(CSS, 'utf8');
        css = css.replace(/\.navbar \{[^}]*background:[^;]+;/, function(m) {
            return m.replace(/background:[^;]+/, 'background: ' + boje[rand(0, boje.length-1)]);
        });
        fs.writeFileSync(CSS, css);
        commit('refine navbar background color');
    },
    function() {
        var naslovi = [
            'Pronađite vaš savršen automobil',
            'Kupite ili prodajte automobil lako',
            'Hiljade automobila na jednom mestu',
            'Vaš novi automobil čeka vas ovde'
        ];
        var html = fs.readFileSync(HTML, 'utf8');
        html = html.replace(/<h1>[^<]+<\/h1>/, '<h1>' + naslovi[rand(0, naslovi.length-1)] + '</h1>');
        fs.writeFileSync(HTML, html);
        commit('update hero headline text');
    },
    function() {
        var opisi = [
            'Hiljade proverenih oglasa na jednom mestu',
            'Brzo, sigurno i povoljno',
            'Najposećeniji auto oglas u regionu',
            'Proverite i pronađite pravo vozilo'
        ];
        var html = fs.readFileSync(HTML, 'utf8');
        html = html.replace(/<p>[^<]+<\/p>/, '<p>' + opisi[rand(0, opisi.length-1)] + '</p>');
        fs.writeFileSync(HTML, html);
        commit('update hero subtitle text');
    },
    function() {
        var html = fs.readFileSync(HTML, 'utf8');
        var br   = (html.match(/auto-kartica/g) || []).length;
        html = html.replace(/id="brOglasa">\d+/, 'id="brOglasa">' + br);
        fs.writeFileSync(HTML, html);
        commit('sync listings counter in stats');
    },
    function() {
        var vel = ['1.1rem','1.15rem','1.2rem','1.05rem'];
        var css = fs.readFileSync(CSS, 'utf8');
        css = css.replace(/\.auto-naslov \{[^}]*font-size:[^;]+;/, function(m) {
            return m.replace(/font-size:[^;]+/, 'font-size: ' + vel[rand(0, vel.length-1)]);
        });
        fs.writeFileSync(CSS, css);
        commit('tweak car card title font size');
    },
    function() {
        var minW = ['260px','270px','280px','290px','300px'];
        var css  = fs.readFileSync(CSS, 'utf8');
        css = css.replace(/grid-template-columns:[^;]+;/, 'grid-template-columns: repeat(auto-fill, minmax(' + minW[rand(0, minW.length-1)] + ', 1fr));');
        fs.writeFileSync(CSS, css);
        commit('adjust grid min column width');
    }
];

// -------------------------------------------------------
// GLAVNI PROGRAM
// -------------------------------------------------------
function pokreni() {
    var progres    = ucitajProgres();
    var dodatiIds  = progres.dodatiIds;

    // koliko commitova danas: 5-12
    var ukupnoCommitova = rand(5, 12);
    console.log('Auto-commit: planiram ' + ukupnoCommitova + ' commitova danas...\n');

    // nadji aute koji jos nisu dodati
    var nedodati = automobili.filter(function(a) {
        return dodatiIds.indexOf(a.id) === -1;
    });

    // koliko auta dodajemo danas (2-3, ali ne vise od nedodatih i ne vise od ukupno commitova)
    var maxAuta  = Math.min(3, nedodati.length, ukupnoCommitova - 2);
    var brAuta   = nedodati.length > 0 ? rand(2, Math.max(2, maxAuta)) : 0;
    var brIzmena = ukupnoCommitova - brAuta;

    // dodaj aute
    if (brAuta > 0) {
        var izmesani = nedodati.slice().sort(function() { return Math.random() - 0.5; });
        var odabrani = izmesani.slice(0, brAuta);
        for (var i = 0; i < odabrani.length; i++) {
            var auto = odabrani[i];
            dodajAuto(auto);
            dodatiIds.push(auto.id);
            sacuvajProgres({ dodatiIds: dodatiIds });
            commit('add ' + auto.marka + ' ' + auto.model + ' listing');
        }
    } else {
        console.log('  Svi automobili su dodati, samo pravim CSS izmene.');
        brIzmena = ukupnoCommitova;
    }

    // dodaj CSS/HTML izmene
    var izmesaneIzmene = izmene.slice().sort(function() { return Math.random() - 0.5; });
    var koliko = Math.min(brIzmena, izmesaneIzmene.length);
    for (var j = 0; j < koliko; j++) {
        try { izmesaneIzmene[j](); } catch(e) { console.log('  greska: ' + e.message); }
    }

    // push na GitHub
    try {
        git('git push origin main');
        console.log('\nUspesno pushvano! Automobili: ' + dodatiIds.length + '/100');
    } catch(e) {
        console.log('Push greska: ' + e.message);
    }

    // otvori GitHub profil u browseru
    exec('start ' + GITHUB_PROFIL, { cwd: FOLDER, shell: true });
}

pokreni();
