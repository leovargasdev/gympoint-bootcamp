module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'students',
      [
        {
          name: 'Matilde Alves Cardoso',
          email: 'MatildeAlvesCardoso@jourrapide.com',
          age: 46,
          height: 165,
          weight: 59.1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Gabrielly Almeida Melo',
          email: 'GabriellyAlmeidaMelo@teleworm.us',
          age: 22,
          height: 169,
          weight: 88.4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Caio Correia Barbosa',
          email: 'CaioCorreiaBarbosa@dayrep.com',
          age: 81,
          height: 162,
          weight: 71.9,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Gabrielly Sousa Castro',
          email: 'GabriellySousaCastro@jourrapide.com',
          age: 31,
          height: 170,
          weight: 63.8,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Breno Barros Martins',
          email: 'BrenoBarrosMartins@dayrep.com',
          age: 19,
          height: 172,
          weight: 71.8,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
