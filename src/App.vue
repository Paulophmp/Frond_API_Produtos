<template>
  <v-app>
    <v-toolbar
        color="blue darken-3"
        dark
        app
        :clipped-left="$vuetify.breakpoint.mdAndUp"
        fixed
    >
    <v-toolbar-title style="width: 300px" class="ml-0 pl-3" to="/">
        <v-btn class="hidden-sm-and-down" flat>Tem de tudo</v-btn>
    </v-toolbar-title>
<!--        <v-text-field-->
<!--                append-icon="search"-->
<!--                label="Search"-->
<!--                solo-inverted-->
<!--                flat-->
<!--                class="mx-3"-->
<!--                @keyup.enter="search(searchNota)"-->
<!--                v-model="searchNota"-->
<!--        ></v-text-field>-->
    <v-spacer></v-spacer>
      <v-menu
              transition="slide-y-transition"
              bottom
      >
        <v-btn
                slot="activator"
                :icon="$vuetify.breakpoint.smAndDown"
                class="pa-0"
                flat
        >
          <v-avatar
                  color="teal"
                  size="30px"
                  class="mr-1 left">
              <span class="white--text headline">P</span>
          </v-avatar>
            <span class="hidden-sm-and-down text-capitalize">Paulo</span>
          <v-icon
                  right
                  dark
                  class="ma-0 hidden-sm-and-down">arrow_drop_down</v-icon>
        </v-btn>

        <v-btn class="hidden-sm-and-down" flat>Tem de tudo</v-btn>
<!--        <v-card style="width: 360px;">-->
<!--          <v-list>-->
<!--            <v-list-tile avatar>-->
<!--              <v-list-tile-avatar>-->
<!--                <v-avatar-->
<!--                        color="blue darken-3"-->
<!--                        size="35px"-->
<!--                        class="mr-1 left">-->
<!--                    <span class="white&#45;&#45;text headline">{{ primeiraLetraNomeUsuario }}</span>-->
<!--                </v-avatar>-->
<!--              </v-list-tile-avatar>-->
<!--              <v-list-tile-content>-->
<!--&lt;!&ndash;                <v-list-tile-title> {{ (this.usuarioGetter ? this.usuarioGetter.data.auth.usu_nome : '') }} </v-list-tile-title>&ndash;&gt;-->
<!--&lt;!&ndash;                <v-list-tile-sub-title>{{ (this.usuarioGetter ? this.usuarioGetter.data.auth.usu_identificacao : '' ) | cpf }}</v-list-tile-sub-title>&ndash;&gt;-->
<!--              </v-list-tile-content>-->
<!--            </v-list-tile>-->
<!--          </v-list>-->
<!--          <v-divider/><v-divider/>-->
<!--          <v-list>-->
<!--            <v-list-tile :to="'/produto/admin/certificado'" >-->
<!--              <v-list-tile-action>-->
<!--                <v-icon color="indigo">note_add</v-icon>-->
<!--              </v-list-tile-action>-->

<!--              <v-list-tile-content>-->
<!--                <v-list-tile-title>Cadastrar Certificado</v-list-tile-title>-->
<!--              </v-list-tile-content>-->
<!--            </v-list-tile>-->

<!--            <v-list-tile  :to="'/produto/admin/listar-certificados'">-->
<!--              <v-list-tile-action>-->
<!--                <v-icon color="indigo">list</v-icon>-->
<!--              </v-list-tile-action>-->

<!--              <v-list-tile-content>-->
<!--                <v-list-tile-title>Listar Certificados</v-list-tile-title>-->
<!--              </v-list-tile-content>-->
<!--            </v-list-tile>-->
<!--          </v-list>-->
<!--        </v-card>-->
      </v-menu>
    </v-toolbar>

    <v-content>
        <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
    };
  },
};
</script>
