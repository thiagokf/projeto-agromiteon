const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// --- CONFIGURAÇÃO DO MONGODB ---
// Substitua 'SUA_URL_DO_MONGO' pela sua string de conexão (local ou MongoDB Atlas)
const mongoURI = 'mongodb://thiagofusco36_db_user:<FzsZ0Jg2B7k6cmt3>@ac-1hzhbhj-shard-00-00.iasbkf4.mongodb.net:27017,ac-1hzhbhj-shard-00-01.iasbkf4.mongodb.net:27017,ac-1hzhbhj-shard-00-02.iasbkf4.mongodb.net:27017/?ssl=true&replicaSet=atlas-b4oset-shard-0&authSource=admin&appName=ClusterAgromiteon'; 

mongoose.connect(mongoURI)
  .then(() => console.log('Conectado ao MongoDB com sucesso!'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Definição do Schema (Estrutura do que será salvo)
const LeadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // unique evita e-mails duplicados
    date: { type: Date, default: Date.now }
});

const Lead = mongoose.model('Lead', LeadSchema);

// --- ROTA DA NEWSLETTER ---
app.post('/newsletter', async (req, res) => {
    const { name, email } = req.body;

    try {
        // Tenta criar um novo registro no banco
        const newLead = new Lead({ name, email });
        await newLead.save();

        console.log(`Sucesso: ${name} (${email}) salvo no banco.`);
        
        return res.status(201).json({ 
            success: true, 
            message: "✓ Inscrição realizada com sucesso!" 
        });

    } catch (error) {
        // Tratamento para e-mail duplicado (erro 11000 no Mongo)
        if (error.code === 11000) {
            return res.status(400).json({ 
                success: false, 
                message: "Este e-mail já está cadastrado." 
            });
        }

        console.error("Erro ao salvar no banco:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Erro interno no servidor." 
        });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));