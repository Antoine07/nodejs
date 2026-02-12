ette approche permet de séparer clairement les données externes (DTO) du modèle métier interne, ce qui protège le cœur de l’application des changements d’API.
L’indexation via Record<number, Movie> optimise l’accès aux données (lookup en O(1) au lieu de parcourir un tableau).
Elle structure le code et rend les transformations explicites, donc plus sûres et maintenables.