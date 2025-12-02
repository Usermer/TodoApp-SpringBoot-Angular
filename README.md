# 📋 TodoApp Kanban - Guide Complet

## 🎯 Vue d'ensemble
Application full-stack de gestion de tâches avec interface Kanban interactive. Développée avec **Spring Boot 3** pour le backend et **Angular 18** pour le frontend.

---

## 🏗️ ARCHITECTURE BACKEND (SPRING BOOT)

### 📁 Structure hiérarchique du projet
```
backend/
├── entity/           → Modèles de données JPA
├── repository/       → Couche d'accès aux données
├── service/         → Logique métier
└── controller/      → Points d'entrée API REST
```

### 🔄 Flux de développement backend

#### **Étape 1 : ENTITÉ (Entity)**
- **Objectif** : Définir la structure de la table `todos` en base de données
- **Annotations clés** : `@Entity`, `@Id`, `@GeneratedValue`, `@Column`
- **Champs standards** : `id`, `title`, `completed`, `createdAt`
- **Lombok utilisé** pour générer automatiquement getters/setters/constructeurs

#### **Étape 2 : REPOSITORY**
- **Objectif** : Interface CRUD avec Spring Data JPA
- **Interface** : `extends JpaRepository<Todo, Long>`
- **Fonctionnalités** : Hérite automatiquement des méthodes (`findAll`, `save`, `deleteById`, etc.)
- **Aucune implémentation manuelle** nécessaire pour les opérations basiques

#### **Étape 3 : SERVICE**
- **Objectif** : Contenir la logique métier
- **Annotation** : `@Service`
- **Méthodes principales** :
  - `findAll()` : Récupérer toutes les tâches
  - `createTodo()` : Créer une nouvelle tâche
  - `update()` : Modifier une tâche existante
  - `delete()` : Supprimer une tâche
- **Injection** du Repository via `@Autowired`

#### **Étape 4 : CONTROLLER**
- **Objectif** : Exposer les endpoints API REST
- **Annotation** : `@RestController`, `@RequestMapping("/api/todos")`
- **Méthodes HTTP** :
  - `GET /` : Liste toutes les tâches
  - `POST /` : Crée une nouvelle tâche
  - `PUT /{id}` : Met à jour une tâche
  - `DELETE /{id}` : Supprime une tâche
- **CORS** configuré pour Angular (`@CrossOrigin`)
- **`@RequestBody`** crucial pour recevoir les données JSON

---

## 🎨 ARCHITECTURE FRONTEND (ANGULAR 18)

### 📁 Structure hiérarchique du projet
```
frontend/
├── models/          → Interfaces TypeScript
├── services/        → Communication avec l'API
└── components/      → Composants d'interface
```

### 🔄 Flux de développement frontend

#### **Étape 1 : MODÈLE (Model)**
- **Objectif** : Interface TypeScript pour typer les données
- **Correspondance** avec l'entité backend
- **Propriétés** : `id?`, `title`, `completed`
- **Type optionnel** pour `id` (car généré côté backend)

#### **Étape 2 : SERVICE**
- **Objectif** : Gérer les appels HTTP vers l'API
- **Dépendance** : `HttpClient` injecté
- **Méthodes principales** :
  - `getTodos()` : GET vers `/api/todos`
  - `addTodo(todo)` : POST avec le todo en body
  - `deleteTodo(id)` : DELETE vers `/api/todos/{id}`
- **Observables** retournés pour la réactivité

#### **Étape 3 : COMPOSANT**
- **Objectif** : Gérer l'interface utilisateur
- **Technologies utilisées** :
  - **Signals** (`signal()`) pour la réactivité
  - **Angular Material** pour le design
  - **CDK Drag & Drop** pour le Kanban
- **Structure Kanban** :
  - 4 colonnes : `todo`, `inProgress`, `review`, `done`
  - Chaque colonne = signal contenant un tableau
  - Drag & Drop entre colonnes
- **Fonctionnalités UI** :
  - Ajout de tâches avec input + bouton
  - Suppression avec bouton poubelle
  - Feedback visuel (loading, erreurs)
  - Mode sombre/clair

---

## 🔗 COMMUNICATION FRONTEND/BACKEND

### 📡 Points d'API
```
GET    http://localhost:8080/api/todos
POST   http://localhost:8080/api/todos
PUT    http://localhost:8080/api/todos/{id}
DELETE http://localhost:8080/api/todos/{id}
```

### 🔧 Configuration cruciale
1. **Backend** : `@CrossOrigin(origins = "http://localhost:4200")`
2. **Frontend** : URL de base configurée dans le service
3. **Headers** : `Content-Type: application/json` pour POST/PUT
4. **`@RequestBody`** : Obligatoire pour désérialiser le JSON

---

## 🎨 INTERFACE UTILISATEUR

### 🏗️ Layout Kanban
```
┌─────────────────────────────────────────────────────┐
│                     Liste de Tâches                  │
├─────────────────────────────────────────────────────┤
│ [Input] + [Bouton Ajouter]                          │
├───────┬─────────────┬──────────────┬───────────────┤
│ À faire│ En cours   │ En revue     │ Terminé       │
├───────┼─────────────┼──────────────┼───────────────┤
│ • Task │ • Task     │ • Task       │ • Task        │
│ • Task │ • Task     │              │ • Task        │
│       │             │              │               │
└───────┴─────────────┴──────────────┴───────────────┘
```

### ✨ Caractéristiques UI
- **Drag & Drop** : Glisser-déposer entre colonnes
- **Boutons d'action** : Suppression par tâche
- **Feedback visuel** :
  - Loading pendant les requêtes
  - Animations de drag
  - Mode sombre avec toggle
- **Responsive** : Adapté aux différentes tailles d'écran

---

## 🚀 DÉPLOIEMENT

### Prérequis
- Java 17+
- Node.js 18+
- MySQL 8.0+
- Angular CLI 18+

### Étapes de lancement
1. **Backend** : `mvn spring-boot:run` (port 8080)
2. **Base de données** : MySQL configuré et démarré
3. **Frontend** : `ng serve` (port 4200)
4. **Navigateur** : `http://localhost:4200`

---

## 🛠️ TECHNOLOGIES UTILISÉES

### Backend
- **Spring Boot 3** : Framework Java
- **Spring Data JPA** : ORM et repositories
- **MySQL** : Base de données relationnelle
- **Lombok** : Réduction du code boilerplate

### Frontend
- **Angular 18** : Framework TypeScript
- **Angular Material** : Composants UI
- **Angular CDK** : Drag & Drop
- **RxJS** : Programmation réactive
- **Signals** : Nouveau système de réactivité

---

## 📸 CAPTURES D'ÉCRAN (À AJOUTER)

1. **Interface principale** : Vue Kanban avec 4 colonnes
2. **Ajout de tâche** : Champ input avec bouton
3. **Drag & Drop** : Tâche en cours de déplacement
4. **Mode sombre** : Interface avec thème sombre activé
5. **Suppression** : Confirmation avant suppression

---

## ✅ FONCTIONNALITÉS IMPLÉMENTÉES

### ✅ Backend
- [x] API REST complète CRUD
- [x] Configuration CORS pour Angular
- [x] Connexion à MySQL
- [x] Validation des données
- [x] Gestion des erreurs HTTP

### ✅ Frontend
- [x] Interface Kanban 4 colonnes
- [x] Drag & Drop fonctionnel
- [x] Ajout/suppression de tâches
- [x] Mode sombre/clair
- [x] Optimistic UI updates
- [x] Gestion des états de chargement
- [x] Design responsive avec Material

