// Step 1: Variables and Data Types

let projectName = "Google Pixel Store";   // String
let totalProducts = 3;                    // Number
let isAvailable = true;                   // Boolean
let phoneModels = ["Pixel 9", "Pixel 8", "Pixel Fold"]; // Array

let company = {                           // Object
    name: "Google",
    product: "Pixel",
    country: "China"
};


// Step 2: Display Variables using DOM
document.getElementById("projectName").innerHTML = projectName;
document.getElementById("totalProducts").innerHTML = totalProducts;

// Better Boolean Display
document.getElementById("availability").innerHTML = isAvailable ? "In Stock ✅" : "Out of Stock ❌";

// Array formatted nicely
document.getElementById("models").innerHTML = phoneModels.join(" | ");

// Object display improved
document.getElementById("companyInfo").innerHTML =
    `${company.name} - ${company.product} (${company.country})`;


// Step 3: Arrow Function (Improved Message)
const showSummary = () => {
    document.getElementById("result").innerHTML =
        `📱 Welcome to ${projectName}! <br>
We currently offer <b>${totalProducts}</b> amazing Pixel models:<br>
${phoneModels.join(", ")}.`;

};


// Step 4: Click Event
document.getElementById("summaryBtn").addEventListener("click", showSummary);


    // STEP 1 — Array of Objects
    let phones = [
        { id:1,  model:"Pixel 9 Pro XL", series:"Pro",      price:1099, ram:16, storage:256, battery:5060, year:2024, stock:"In Stock"     },
        { id:2,  model:"Pixel 9 Pro",    series:"Pro",      price:999,  ram:16, storage:128, battery:4700, year:2024, stock:"In Stock"     },
        { id:3,  model:"Pixel 9",        series:"Standard", price:799,  ram:12, storage:128, battery:4700, year:2024, stock:"In Stock"     },
        { id:4,  model:"Pixel 9 Fold",   series:"Fold",     price:1799, ram:16, storage:256, battery:4650, year:2024, stock:"Low Stock"    },
        { id:5,  model:"Pixel 8 Pro",    series:"Pro",      price:799,  ram:12, storage:128, battery:5050, year:2023, stock:"In Stock"     },
        { id:6,  model:"Pixel 8",        series:"Standard", price:599,  ram:8,  storage:128, battery:4575, year:2023, stock:"In Stock"     },
        { id:7,  model:"Pixel 8a",       series:"A-Series", price:499,  ram:8,  storage:128, battery:4492, year:2024, stock:"In Stock"     },
        { id:8,  model:"Pixel 7a",       series:"A-Series", price:349,  ram:8,  storage:128, battery:4385, year:2023, stock:"Low Stock"    },
        { id:9,  model:"Pixel 7 Pro",    series:"Pro",      price:599,  ram:12, storage:128, battery:5000, year:2022, stock:"Out of Stock" },
        { id:10, model:"Pixel 6a",       series:"A-Series", price:299,  ram:6,  storage:128, battery:4410, year:2022, stock:"Out of Stock" },
    ];
    let nextId = 11, editingId = null, activeChip = 'all';


    // STEP 2 — Render with Array.map()
    function seriesClass(s) {
        if (s==='A-Series') return 'series-a';
        if (s==='Pro')      return 'series-pro';
        if (s==='Fold')     return 'series-fold';
        return 'series-standard';
    }
    function stockClass(s) {
        if (s==='In Stock')  return 'in-stock';
        if (s==='Low Stock') return 'low-stock';
        return 'out-stock';
    }

    function renderCards(list) {
        const grid = document.getElementById('cardsGrid');
        if (!list.length) {
            grid.innerHTML = '<div class="col-span-full text-center py-16 text-gray-500 font-mono text-sm">📵 No devices match your filters.</div>';
            updateStats(); return;
        }
        grid.innerHTML = list.map((p, i) => `
            <div class="phone-card" style="animation-delay:${i*.05}s">
                <div class="card-header">
                    <div>
                        <div class="card-model">${p.model}</div>
                        <span class="card-series ${seriesClass(p.series)}">${p.series}</span>
                    </div>
                    <div class="card-price">$${p.price}</div>
                </div>
                <div class="card-body">
                    <div class="card-spec"><span class="spec-key">RAM</span><span class="spec-val">${p.ram} GB</span></div>
                    <div class="card-spec"><span class="spec-key">Storage</span><span class="spec-val">${p.storage} GB</span></div>
                    <div class="card-spec"><span class="spec-key">Battery</span><span class="spec-val">${p.battery} mAh</span></div>
                    <div class="card-spec"><span class="spec-key">Year</span><span class="spec-val">${p.year}</span></div>
                    <div class="card-spec"><span class="spec-key">Stock</span>
                        <span class="stock-badge ${stockClass(p.stock)}">${p.stock}</span>
                    </div>
                </div>
                <div class="card-actions">
                    <button class="lab-btn lab-btn-edit"   onclick="openEdit(${p.id})">✏ Edit</button>
                    <button class="lab-btn lab-btn-delete" onclick="deletePhone(${p.id})">✕ Delete</button>
                </div>
            </div>
        `).join('');
        updateStats();
    }

    function updateStats() {
        document.getElementById('totalCount').textContent  = phones.length;
        document.getElementById('inStockCount').textContent = phones.filter(p=>p.stock==='In Stock').length;
        const avg = phones.length ? Math.round(phones.reduce((s,p)=>s+p.price,0)/phones.length) : 0;
        document.getElementById('avgPrice').textContent = '$'+avg;
    }

    // STEP 3 — Add with Array.push()

    function addPhone() {
        const model=document.getElementById('f-model').value.trim(),
              series=document.getElementById('f-series').value,
              price=parseInt(document.getElementById('f-price').value),
              ram=parseInt(document.getElementById('f-ram').value),
              storage=parseInt(document.getElementById('f-storage').value),
              battery=parseInt(document.getElementById('f-battery').value),
              year=parseInt(document.getElementById('f-year').value),
              stock=document.getElementById('f-stock').value;
        if (!model||isNaN(price)||isNaN(ram)||isNaN(storage)||isNaN(battery)||isNaN(year)){
            alert('Please fill in all fields correctly.'); return;
        }
        phones.push({ id:nextId++, model, series, price, ram, storage, battery, year, stock });
        clearForm(); applyFilters();
    }

    function clearForm(){
        ['f-model','f-price','f-ram','f-storage','f-battery','f-year'].forEach(id=>document.getElementById(id).value='');
        document.getElementById('f-series').value='Standard';
        document.getElementById('f-stock').value='In Stock';
    }


    // STEP 4 — Delete with Array.filter()
    function deletePhone(id){
        if(!confirm('Delete this device?')) return;
        phones = phones.filter(p=>p.id!==id);
        applyFilters();
    }

    // STEP 5 — Edit / Update
    function openEdit(id){
        const p=phones.find(p=>p.id===id); if(!p) return;
        editingId=id;
        document.getElementById('e-model').value  =p.model;
        document.getElementById('e-series').value =p.series;
        document.getElementById('e-price').value  =p.price;
        document.getElementById('e-ram').value    =p.ram;
        document.getElementById('e-storage').value=p.storage;
        document.getElementById('e-battery').value=p.battery;
        document.getElementById('e-year').value   =p.year;
        document.getElementById('e-stock').value  =p.stock;
        document.getElementById('editModal').classList.add('open');
    }
    function closeModal(){ document.getElementById('editModal').classList.remove('open'); editingId=null; }
    function updatePhone(){
        const idx=phones.findIndex(p=>p.id===editingId); if(idx===-1) return;
        phones[idx]={ ...phones[idx],
            model:  document.getElementById('e-model').value.trim(),
            series: document.getElementById('e-series').value,
            price:  parseInt(document.getElementById('e-price').value),
            ram:    parseInt(document.getElementById('e-ram').value),
            storage:parseInt(document.getElementById('e-storage').value),
            battery:parseInt(document.getElementById('e-battery').value),
            year:   parseInt(document.getElementById('e-year').value),
            stock:  document.getElementById('e-stock').value,
        };
        closeModal(); applyFilters();
    }

    // STEP 6 — Filters

    function setChip(el, key){
        document.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
        el.classList.add('active'); activeChip=key; applyFilters();
    }
    function applyFilters(){
        const q=document.getElementById('searchInput').value.toLowerCase();
        let r=phones;
        if(q) r=r.filter(p=>
            p.model.toLowerCase().includes(q)||p.series.toLowerCase().includes(q)||
            String(p.price).includes(q)||String(p.year).includes(q)||String(p.ram).includes(q)
        );
        if(activeChip==='Pro')       r=r.filter(p=>p.series==='Pro');
        else if(activeChip==='A-Series') r=r.filter(p=>p.series==='A-Series');
        else if(activeChip==='Fold') r=r.filter(p=>p.series==='Fold');
        else if(activeChip==='instock')   r=r.filter(p=>p.stock==='In Stock');
        else if(activeChip==='price-low') r=r.filter(p=>p.price<700);
        else if(activeChip==='2024')      r=r.filter(p=>p.year===2024);
        renderCards(r);
    }
    function resetFilters(){
        document.getElementById('searchInput').value='';
        activeChip='all';
        document.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
        document.querySelector('[data-filter="all"]').classList.add('active');
        applyFilters();
    }


    // TAB SWITCHING
    function switchLabTab(name, btn){
        document.querySelectorAll('.lab-section').forEach(s=>s.classList.remove('active'));
        document.querySelectorAll('.lab-tab').forEach(b=>b.classList.remove('active'));
        document.getElementById('lab-tab-'+name).classList.add('active');
        btn.classList.add('active');
        if(name==='control') renderControlStructures();
    }

    // PART 2 — CONTROL STRUCTURES
    function renderControlStructures(){
        const grid=document.getElementById('csGrid');
        grid.innerHTML='';

        // ── IF–ELSE ──
        let ifRows='';
        phones.forEach(p=>{
            let tier= p.price>=1000?'<span class="hl-purple">Premium 💎</span>':
                      p.price>=700 ?'<span class="hl-accent">Mid-High 🔷</span>':
                      p.price>=500 ?'<span class="hl-success">Mid-Range ✅</span>':
                                    '<span class="hl-warn">Budget 💰</span>';
            let ramLvl  = p.ram>=12 ?'<span class="hl-success">High-RAM</span>':'<span class="hl-warn">Std-RAM</span>';
            let battLvl = p.battery>=5000?'<span class="hl-success">Long-life 🔋</span>':'<span style="color:#666">Standard</span>';
            let stockLvl= p.stock==='Out of Stock'?'<span class="hl-danger">⚠ OOS</span>':
                          p.stock==='Low Stock'   ?'<span class="hl-warn">⚡ Low</span>':
                                                    '<span class="hl-success">✓ Avail</span>';
            let ageLvl  = p.year>=2024?'<span class="hl-accent">New</span>':'<span style="color:#666">Older</span>';
            ifRows+=`<div class="cs-output mb-1" style="font-size:.7rem">
                <span class="hl-accent">${p.model}</span> → ${tier} · ${ramLvl} · ${battLvl} · ${stockLvl} · ${ageLvl}
            </div>`;
        });
        grid.appendChild(makeCSCard('If–Else Conditions','if','5 conditions per phone: price tier, RAM, battery, stock, year.',ifRows));

        // ── FOR LOOP ──
        let forCards='', forList='', forTableRows='';
        for(let i=0;i<phones.length;i++){
            const p=phones[i];
            forCards+=`<span class="stock-badge ${stockClass(p.stock)}" style="margin:.2rem;display:inline-block;">${p.model} — $${p.price}</span>`;
            forList +=`<div class="cs-output mb-1" style="font-size:.7rem"><span class="hl-accent">${i+1}.</span> ${p.model} <span class="hl-success">$${p.price}</span></div>`;
            forTableRows+=`<tr><td>${p.model}</td><td>${p.series}</td><td class="hl-accent">$${p.price}</td><td>${p.year}</td></tr>`;
        }
        const forBody=`
            <p class="text-gray-500 text-xs mb-2 font-mono">Cards:</p>
            <div class="mb-3">${forCards}</div>
            <p class="text-gray-500 text-xs mb-2 font-mono">List:</p>
            <div class="mb-3">${forList}</div>
            <p class="text-gray-500 text-xs mb-2 font-mono">Table:</p>
            <table class="lab-table"><thead><tr><th>Model</th><th>Series</th><th>Price</th><th>Year</th></tr></thead>
            <tbody>${forTableRows}</tbody></table>`;
        grid.appendChild(makeCSCard('For Loop — Cards, List &amp; Table','for','Iterates array index 0 → length-1.',forBody));

        // ── WHILE LOOP ──
        let whileOut='', wi=0;
        while(wi<phones.length){
            const p=phones[wi];
            whileOut+=`<div class="cs-output mb-1" style="font-size:.7rem">
                <span class="hl-accent">[${String(wi+1).padStart(2,'0')}]</span>
                ${p.model} → RAM: <span class="hl-success">${p.ram}GB</span> | Batt: <span class="hl-warn">${p.battery}mAh</span>
            </div>`;
            wi++;
        }
        grid.appendChild(makeCSCard('While Loop','while','Loops while index &lt; array.length.',whileOut));

        // ── LOOP + CONDITION ──
        const cats={Premium:[],MidHigh:[],MidRange:[],Budget:[]};
        for(let j=0;j<phones.length;j++){
            const p=phones[j];
            if(p.price>=1000)     cats.Premium.push(p.model);
            else if(p.price>=700) cats.MidHigh.push(p.model);
            else if(p.price>=500) cats.MidRange.push(p.model);
            else                   cats.Budget.push(p.model);
        }
        const styles={Premium:'hl-purple',MidHigh:'hl-accent',MidRange:'hl-success',Budget:'hl-warn'};
        let comboOut='';
        for(const[cat,models] of Object.entries(cats)){
            comboOut+=`<div class="cs-output mb-1" style="font-size:.7rem">
                <span class="${styles[cat]}">[${cat}]</span> → ${models.join(', ')||'None'}
            </div>`;
        }
        grid.appendChild(makeCSCard('Loop + Conditions — Price Categories','combo','For loop with nested if–else to group into tiers.',comboOut));
    }

    function makeCSCard(title, type, subtitle, bodyHTML){
        const tagMap={if:['If–Else','#3b82f6'],for:['For Loop','#4fcea2'],while:['While Loop','#a78bfa'],combo:['Loop + If','#f7b64f']};
        const [label,color]=tagMap[type];
        const d=document.createElement('div');
        d.className='bg-gray-900 border border-gray-700 rounded-xl overflow-hidden';
        d.innerHTML=`
            <div class="flex items-center gap-2 px-4 py-3 border-b border-gray-700">
                <span style="background:${color}22;color:${color};border:1px solid ${color}44"
                    class="text-xs font-mono px-2 py-0.5 rounded uppercase tracking-widest">${label}</span>
                <span class="text-white text-sm font-bold">${title}</span>
            </div>
            <div class="p-4">
                <p class="text-gray-500 text-xs font-mono mb-3">${subtitle}</p>
                ${bodyHTML}
            </div>`;
        return d;
    }

    // ─── INIT ───
    renderCards(phones);