let list=[]
let id=list.length
//Création
//********************************************************************
function create()
{
   let nom= document.getElementById("nom").value;
   let prenom= document.getElementById("prenom").value;
   let email= document.getElementById("email").value
   id++;
   let person={
       "id":id,
       "nom": nom,
       "prenom": prenom,
       "email": email
   }
   list.push(person)
   console.log(list)

   let node = document.createElement("ion-item");
   node.id=person.id;

   let label = document.createElement("ion-label"); 
   label.textContent=nom;
   label.id=nom+id+"nom";
   node.appendChild(label);

   let label1 = document.createElement("ion-label"); 
   label1.textContent=prenom;
   label1.id=prenom+id+"prenom";
   node.appendChild(label1);

   let label2 = document.createElement("ion-label"); 
   label2.textContent=email;
   label2.id=email+id+"email";
   node.appendChild(label2);
   
   let editButton = document.createElement("ion-button"); 
   editButton.textContent="Modifier";
   editButton.addEventListener('click', function(){
    presentModal(person);
   });
   node.appendChild(editButton);

   let deleteButton = document.createElement("ion-button"); 
   deleteButton.textContent="Supprimer";
   deleteButton.addEventListener("click",function(){
    presentAlertConfirm(person.id);
   });
   node.appendChild(deleteButton);

   el=document.getElementById("list").appendChild(node);
}

//Suppression
//********************************************************************
function presentAlertConfirm(id) {
  const alert = document.createElement('ion-alert');
  alert.header = 'Confirmation';
  alert.message = 'Voulez-vous supprimer cette personne ?';
  alert.buttons = [
    {
      text: 'Annuler',
      role: 'cancel',
      cssClass: 'secondary',
      handler: (blah) => {
        console.log('Confirm Cancel: blah');
      }
    }, {
      text: 'Oui',
      handler: () => {
        var myobj = document.getElementById(id);
        myobj.remove();
        let index=list.findIndex((object) => object.id===id);
        list.splice(index,1);
        console.log('Confirm Okay')
      }
    }
  ];

  document.body.appendChild(alert);
  return alert.present();
}

//Modification
//********************************************************************
let currentModal = null;
function dismissModal() {
  if (currentModal) {
    currentModal.dismiss().then(() => { currentModal = null; });
  }
}
function presentModal(objet) {
  // create the modal with the `modal-page` component
  const modalElement = document.createElement('ion-modal');
  modalElement.component = 'modal-page';
  modalElement.componentProps = objet;
  document.body.appendChild(modalElement);
  currentModal=modalElement;
  return modalElement.present();
}
customElements.define('modal-page', class extends HTMLElement {
  connectedCallback() {
    const modalElement = document.querySelector('ion-modal');
    const nom=modalElement.componentProps.nom;
    const prenom=modalElement.componentProps.prenom;
    const email=modalElement.componentProps.email; 
    const idPerson=modalElement.componentProps.id;
    this.innerHTML = `
      <ion-header translucent>
        <ion-toolbar>
          <ion-title>Modififer les informations</ion-title>
          <ion-buttons slot="end">
            <ion-button onclick="dismissModal()">Fermer</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content fullscreen>
        <ion-list>
          <form>
            <ion-item>
                <ion-label  position="floating">Nom</ion-label>
                <ion-input id="nomMod" value=`+nom+`></ion-input>
            </ion-item>
            <ion-item>
                <ion-label position="floating">Prenom</ion-label>
                <ion-input id="prenomMod" value=`+prenom+`></ion-input>
            </ion-item>
            <ion-item>
                <ion-label position="floating">Email</ion-label>
                <ion-input type="email" id="emailMod" value=`+email+`></ion-input>
            </ion-item>
            <ion-button onclick="modifier(`+idPerson+`)" color="primary">Modifier</ion-button>
          </form>
        </ion-list>
      </ion-content>
    `;
  }
});
function modifier(idd)
{
  const nomMod=document.getElementById("nomMod").value;
  const prenomMod=document.getElementById("prenomMod").value;
  const emailMod=document.getElementById("emailMod").value;
  newPerson={
    "id":idd,
    "nom":nomMod,
    "prenom":prenomMod,
    "email":emailMod
  }
  console.log(newPerson);
  newList=list.map(function(ob){ 
    console.log(ob); 
    if (ob['id']===idd)
      {
        let labNom=document.getElementById(ob['nom']+ob['id']+"nom");
        labNom.textContent=newPerson['nom'];

        let labPrenom=document.getElementById(ob['prenom']+ob['id']+"prenom");
        labPrenom.textContent=newPerson['prenom'];

        let labEmail=document.getElementById(ob['email']+ob['id']+"email");
        labEmail.textContent=newPerson['email'];
        return newPerson;
      }
    return ob;
  }
  );
  list=newList;
  console.log(list);
}
//********************************************************************