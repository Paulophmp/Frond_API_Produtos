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
              to="/produto-cadastrar"
            >
              Cadastrar Produto
            </v-btn>
          </div>
            <v-card>
                <v-container fluid>
                    <v-layout
                            row
                            wrap>
                        <v-flex xs6>
                            <h2 class="mr-3 blue--text">Lista de Produtos</h2>
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
                    :items="listarProdutosGetter"
                    class="elevation-1"
            >
                <template v-slot:items="props">
                    <td class="text-xs-left">{{ props.item.nome }}</td>
                    <td class="text-xs-right">{{ props.item.quantidadeEstoque }}</td>
                    <td class="text-xs-right">{{ props.item.valorUnitario }}</td>
                    <td class="text-xs-left">
                      {{( props.item.situacao == 'd' ? 'Disponivel' : 'Indisponivel' )}}
                    </td>
                    <td class="justify-center layout px-0">
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
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';


export default {
  name: 'ListarProdutos',
  components: {
  },
  data() {
    return {
      options: {
        color: 'red',
        width: 290,
        zIndex: 200,
      },
      itemIdParaExclusao: null,
      loading: false,
      dialogExcluir: false,
      headers: [
        {
          text: 'Produto',
          align: 'left',
          value: 'nome',
        },
        {
          text: 'Quantidade em estoque',
          align: 'left',
          value: 'quantidadeEstoque',
        },
        {
          text: 'Valor unitário',
          align: 'left',
          value: 'valorUnitario',
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
    listarProdutosGetter() {
      this.loading = false;
    },
  },
  created() {
    this.listarProdutosAction();
  },
  computed: {
    ...mapGetters({
      listarProdutosGetter: 'produto/listarProdutosGetter',
    }),
  },
  methods: {
    ...mapActions({
      listarProdutosAction: 'produto/listarProdutosAction',
      excluirProdutosAction: 'produto/excluirProdutosAction',
    }),
    deletarItem() {
      this.dialogExcluir = false;
      this.excluirProdutosAction(this.itemIdParaExclusao);
    },
    editItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
  },
};
</script>
