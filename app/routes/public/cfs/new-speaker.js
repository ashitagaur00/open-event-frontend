import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.get('l10n').t('New Speaker');
  },

  async model() {
    const eventDetails = this.modelFor('public');
    return {
      event : eventDetails,
      forms : await eventDetails.query('customForms', {
        sort         : 'id',
        'page[size]' : 50
      }),
      speaker: await this.get('authManager.currentUser').query('speakers', {
        filter: [
          {
            name : 'event',
            op   : 'has',
            val  : {
              name : 'identifier',
              op   : 'eq',
              val  : eventDetails.id
            }
          }
        ]
      })
    };
  }
});
