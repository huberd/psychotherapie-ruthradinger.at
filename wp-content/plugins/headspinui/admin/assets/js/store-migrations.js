document.addEventListener('alpine:init', () => {
  Alpine.store('migrations', {
    migrations: [
      function migration_2_0() {


        Alpine.store('defaults').data.colorSchemas.forEach(dSchema => {
          var match = false;
          Alpine.store('pd').colorSchemas.forEach(schema => {
            if (!('enabled' in schema)) {
              schema['enabled'] = true;
            }
            if (dSchema.name == schema.name) {
              match = true;
              schema['presetColor'] = true;
            }
          })
          if (!match) {
            Alpine.store('pd').colorSchemas.push(dSchema)
          }
        })
        if (!shouldRunMigration('2.0.1')) return;
        Alpine.store('connect').importBoilerplate(0, 0, true);
        Alpine.store('pd').version = '2.0.2';
        Alpine.store('colorWheel').neutralsOptimizer();
      }
    ],

    run() {
      this.migrations.forEach(m => m());
    }
  });
  function shouldRunMigration(migrationVersion) {
    const current = Alpine.store('pd').version || "1.9";
    const pa = current.split('.').map(Number);
    const pb = migrationVersion.split('.').map(Number);

    const len = Math.max(pa.length, pb.length);

    for (let i = 0; i < len; i++) {
      const x = pa[i] ?? 0;
      const y = pb[i] ?? 0;
      console.log(x, y);
      if (x < y) return true;   // current is older than migration version
      if (x > y) return false;  // current is newer than migration version
    }

    return false; // exactly equal → no migration
  }


});