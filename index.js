let etudiants = [];

const btnAjouter = document.getElementById("btnAjouter");

btnAjouter.addEventListener("click", ajouterEtudiant);

function ajouterEtudiant() {

    const nom = document.getElementById("nom").value;
    const prenom = document.getElementById("prenom").value;
    const email = document.getElementById("email").value;
    const classe = document.getElementById("classe").value;
    const note = parseFloat(document.getElementById("note").value);

    if(
        nom === "" ||
        prenom === "" ||
        email === "" ||
        classe === "" ||
        isNaN(note)
    ){
        alert("Veuillez remplir tous les champs");
        return;
    }

    const etudiant = {
        nom,
        prenom,
        email,
        classe,
        note
    };

    etudiants.push(etudiant);

    afficherEtudiants();

    mettreAJourStats();

    document.getElementById("message").innerHTML =
        "Étudiant ajouté avec succès.";

    document.getElementById("nom").value = "";
    document.getElementById("prenom").value = "";
    document.getElementById("email").value = "";
    document.getElementById("classe").value = "";
    document.getElementById("note").value = "";
}

function afficherEtudiants() {

    const tbody = document.getElementById("tableBody");

    tbody.innerHTML = "";

    etudiants.forEach((etud, index) => {

        const resultat =
            etud.note >= 10
            ? '<span class="admis">Admis</span>'
            : '<span class="echec">Échec</span>';

        tbody.innerHTML += `
            <tr>
                <td>${etud.nom} ${etud.prenom}</td>
                <td>${etud.email}</td>
                <td>${etud.classe}</td>
                <td>${etud.note}/20</td>
                <td>${resultat}</td>
                <td>
                   <button
                     class="delete-btn"
                     onclick="supprimerEtudiant(${index})">
                     Supprimer
                   </button>
                </td>
            </tr>
        `;
    });
}

function supprimerEtudiant(index){

    etudiants.splice(index,1);

    afficherEtudiants();

    mettreAJourStats();
}

function mettreAJourStats(){

    document.getElementById("totalEtudiants").textContent =
        etudiants.length;

    const somme = etudiants.reduce(
        (total, e) => total + e.note,
        0
    );

    const moyenne =
        etudiants.length > 0
        ? (somme / etudiants.length).toFixed(2)
        : "0.00";

    document.getElementById("moyenneGenerale").textContent =
        moyenne + "/20";

    const admis = etudiants.filter(
        e => e.note >= 10
    ).length;

    document.getElementById("etudiantsAdmis").textContent =
        admis;
}

document
.getElementById("search")
.addEventListener("keyup", function() {

    const valeur = this.value.toLowerCase();

    const lignes =
        document.querySelectorAll("#tableBody tr");

    lignes.forEach(ligne => {

        const texte =
            ligne.textContent.toLowerCase();

        ligne.style.display =
            texte.includes(valeur)
            ? ""
            : "none";
    });
});