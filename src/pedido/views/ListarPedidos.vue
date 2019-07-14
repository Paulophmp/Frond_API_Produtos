<template>
    <div>
        <div v-if="loading">
            <carregando :text="'Lista de certificados'"/>
        </div>
        <v-container v-else>
          <div class="text-xs-right">
            <v-btn
              round
              color="primary"
              dark
              to="/pedido-cadastrar"
            >
              Cadastrar Pedido
            </v-btn>
          </div>
            <v-card>
                <v-container fluid>
                    <v-layout
                            row
                            wrap>
                        <v-flex xs6>
                            <h2 class="mr-3 blue--text">Lista de Pedidos</h2>
                        </v-flex>
                        <v-flex
                                xs5
                                offset-xs1
                                class=" text-xs-right">
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card>

            <v-data-table
                    :headers="headers"
                    :items="listarPedidosGetter"
                    class="elevation-1"
            >
                <template v-slot:items="props">
                    <td class="text-xs-left">{{ props.item.solicitante }}</td>
                    <td class="text-xs-left">{{ props.item.logradouro }}</td>
                    <td class="text-xs-center">{{ props.item.despachante }}</td>
                    <td class="text-xs-center">
                      {{( props.item.situacao == 'd' ? 'Disponivel' : 'Indisponivel' )}}
                    </td>
                    <td class="justify-center layout px-0">
                      <v-icon
                        small
                        class="mr-2"
                        @click="showItem(props.item)"
                      >
                        visibility
                      </v-icon>
                        <v-icon
                                small
                                class="mr-2"
                                @click="editItem(props.item)"
                        >
                            edit
                        </v-icon>
                        <v-icon
                                small
                                @click="dialogExcluir = true; itemIdParaExclusao = props.item.id;"
                        >
                            delete
                        </v-icon>
                    </td>
                </template>
            </v-data-table>
        </v-container>
      <!--dialog excluir-->
      <v-dialog
        v-model="dialogExcluir"
        :max-width="options.width"
        @keydown.esc="cancel"
        v-bind:style="{ zIndex: options.zIndex }"
      >
        <v-card>
          <v-toolbar dark :color="options.color" dense flat>
            <v-toolbar-title class="white--text">Deletar</v-toolbar-title>
          </v-toolbar>
          <v-card-text>Deseja excluir o produto? </v-card-text>
          <v-card-actions class="pt-0">
            <v-spacer></v-spacer>
            <v-btn color="grey" flat="flat" @click="dialogExcluir = false">Cancelar</v-btn>
            <v-btn color="primary darken-1" flat="flat" @click="deletarItem">Sim</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogDados">
        <v-card>
          {{ visualizarDados }}
          <v-card-text>
            <v-container
              grid-list-md
              text-xs-left>
              <br>
              <div>
                <v-layout
                  justify-space-around
                  row
                  wrap>
                  <v-flex
                    lg12
                    dark
                    class="text-xs-left">
                    <b><h4>Dados Completos</h4></b>
                    <v-divider class="pb-2"/>
                  </v-flex>
                  <v-flex>
                    <b>Solicitante</b>
                    <p>
                      {{ visualizarDados.solicitante }}
                    </p>
                  </v-flex>
                  <v-flex>
                    <b>Despachante</b>
                    <p>
                      {{ visualizarDados.despachante }}
                    </p>
                  </v-flex>
                  <v-flex>
                    <b>CEP</b>
                    <p>
                      {{ visualizarDados.cep }}
                    </p>
                  </v-flex>
                  <v-flex>
                    <b>Endereço</b>
                    <p>{{ visualizarDados.logradouro }} -
                      {{ visualizarDados.cep }},
                      {{ visualizarDados.localidade }},
                      {{ visualizarDados.uf }}
                    </p>
                  </v-flex>
                </v-layout>
                <div>
                  <v-layout
                    justify-space-around
                    row
                    wrap>
                    <v-flex>
                      <b>Solicitante</b>
                      <p>
                        {{ visualizarDados.solicitante }}
                      </p>
                    </v-flex>
                    <v-flex>
                      <b>Cep</b>
                      <p>
                        {{ visualizarDados.cep }}
                      </p>
                    </v-flex>
                    <v-flex>
                      <b>Endereço</b>
                      <p>{{ visualizarDados.logradouro }} -
                        {{ visualizarDados.cep }},
                        {{ visualizarDados.localidade }},
                        {{ visualizarDados.uf }}
                      </p>
                    </v-flex>
                  </v-layout>
                </div>
              </div>
              <br>
            </v-container>
          </v-card-text>
          <v-divider/>
          <v-card-actions>
            <v-spacer/>
            <v-btn
              color="red"
              flat
              @click="dialogDados = false"
            >
              Fechar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>


    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';


export default {
  name: 'ListarPedidos',
  components: {
  },
  data() {
    return {
      options: {
        color: 'red',
        width: 290,
        zIndex: 200,
      },
      visualizarDados: {},
      itemIdParaExclusao: null,
      loading: false,
      dialogExcluir: false,
      dialogDados: false,
      endCompleto: '',
      headers: [
        {
          text: 'Solicitante',
          align: 'left',
          value: 'solicitante',
        },
        {
          text: 'Endereco',
          align: 'left',
          value: 'endereco',
        },
        {
          text: 'Despachante',
          align: 'center',
          value: 'despachante',
        },
        {
          text: 'Situação',
          align: 'left',
          value: 'situacao',
        },
        {
          text: 'Ações',
          align: 'center',
        },
      ],
      data: [],
    };
  },
  watch: {
    listarPedidosGetter() {
      this.loading = false;
    },
  },
  created() {
    this.listarPedidosAction();
  },
  computed: {
    ...mapGetters({
      listarPedidosGetter: 'pedido/listarPedidosGetter',
      excluirPedidosGetter: 'pedido/excluirPedidosGetter',
    }),
  },
  methods: {
    ...mapActions({
      listarPedidosAction: 'pedido/listarPedidosAction',
      excluirPedidosAction: 'pedido/excluirPedidosAction',
    }),
    deletarItem() {
      this.dialogExcluir = false;
      this.excluirPedidosAction(this.itemIdParaExclusao);
    },
    editItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    showItem(item) {
      this.visualizarDados = item;
      this.dialogDados = true;
    },
  },
};
</script>
