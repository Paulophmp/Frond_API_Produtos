<template>
  <v-container>
    <v-card>
      <v-card>
        <v-container fluid>
          <v-layout
            row
            wrap>
            <v-flex xs6>
              <h2 class="mr-3 blue--text">Cadastrar Produto</h2>
            </v-flex>
            <v-flex
              xs5
              offset-xs1
              class=" text-xs-right">
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <v-container
        fluid
      >
        <v-form
          enctype="multipart/form-data"
          ref="form"
          files="true"
          v-model="valid"
          lazy-validation
        >
          <input type="hidden" name="_token" :value="csrf">
          <v-container>
            <v-layout>
              <v-flex
                xs12
                md6
              >
                <v-text-field
                  v-model="cadastrar.nome"
                  :rules="nomeRules"
                  label="Nome do Produto"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex
                xs12
                md6
              >
                <v-text-field
                  v-model="cadastrar.valorUnitario"
                  :rules="valorRules"
                  label="Valor"
                  type="number"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex
                xs12
                md6
              >
                <v-text-field
                  v-model="cadastrar.quantidadeEstoque"
                  :rules="qtdRules"
                  type="number"
                  label="Quantidade"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout>
              <v-snackbar
                v-model="snackbar"
                :multi-line="mode === 'multi-line'"
                right
                :timeout="timeout"
                bottom
                :color="statusSnackBar"
                :vertical="mode === 'vertical'"
              >
                {{ text }}
                <v-btn
                  dark
                  flat
                  @click="snackbar = false"
                >
                  <v-icon>clear</v-icon>
                </v-btn>
              </v-snackbar>
            </v-layout>
            <div class="text-xs-right">
              <v-btn @click="submit" :loading="loading"> Cadastrar </v-btn>
              <v-btn @click="resetValidation"> Limpar </v-btn>
            </div>
          </v-container>
        </v-form>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'CadastrarProduto',
  data() {
    return {
      loading: false,
      statusSnackBar: '',
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 2500,
      text: '',
      cadastrar: {
        nome: '',
        valorUnitario: '',
        quantidadeEstoque: '',
        situacao: 'd',
      },
      valid: true,
      data: null,
      show3: false,
      nomeRules: [
        v => !!v || 'Nome is required',
      ],
      qtdRules: [
        v => !!v || 'Valor is required',
      ],
      valorRules: [
        v => !!v || 'Quantidade is required',
      ],
    };
  },
  computed: {
    ...mapGetters({
      cadastrarProdutoGetter: 'produto/cadastrarProdutoGetter',
    }),
  },
  methods: {
    ...mapActions({
      cadastrarProdutosAction: 'produto/cadastrarProdutosAction',
    }),
    submit() {
      console.log('aaaadsdsd', this.cadastrar);
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.cadastrarProdutosAction(this.cadastrar).then(() => {
          this.loading = false;
        });
        this.menssageSuccess();
        this.resetValidation();
      } else {
        this.menssageError();
      }
    },
    resetValidation() {
      this.$refs.form.reset();
    },
    menssageSuccess(text = 'Cadastrado com sucesso!') {
      this.statusSnackBar = 'success';
      this.text = text;
      this.snackbar = true;
    },
    menssageError(text = 'Erro ao cadastrar!') {
      this.statusSnackBar = 'error';
      this.text = text;
      this.snackbar = true;
    },
  },
};
</script>
