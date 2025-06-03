function calculatePrice() {
    const factoryPrice = parseFloat(document.getElementById('factoryPrice').value) || 0;
    const inputElement = document.getElementById('factoryPrice');
    
    // Validação do input vazio
    if (!inputElement.value.trim()) {
        inputElement.classList.add('error');
        showError('Por favor, adicione um valor');
        return;
    }
    
    // Remove classe de erro se existir
    inputElement.classList.remove('error');
    hideError();
    
    // Cálculos
    const baseProfit = 50; // Lucro fixo
    const shipping = 16; // Frete
    
    // Cálculo do preço base (sem o acréscimo de 5%)
    const basePrice = factoryPrice + baseProfit + shipping;
    
    // Cálculo do acréscimo de 5%
    const increment = basePrice * 0.05;
    
    // Cálculo do preço final com acréscimo de 5%
    const finalPrice = basePrice + increment;

    // Cálculo da porcentagem de lucro
    const baseWithoutProfit = factoryPrice + shipping;
    const profitPercentage = (baseProfit / baseWithoutProfit) * 100;
    
    // Exibir resultados
    document.getElementById('pixPrice').textContent = finalPrice.toFixed(2);
    document.getElementById('profitPercentage').textContent = profitPercentage.toFixed(1);
    document.getElementById('result').classList.add('show');
}

function showError(message) {
    // Remove mensagem de erro existente se houver
    hideError();
    
    // Cria elemento de erro
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    // Insere após o input
    const inputGroup = document.querySelector('.input-group');
    inputGroup.appendChild(errorDiv);
}

function hideError() {
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

function copyTotal() {
    const totalValue = document.getElementById('pixPrice').textContent;
    const textToCopy = `R$ ${totalValue}`;
    
    // Criar um elemento temporário
    const tempInput = document.createElement('input');
    tempInput.value = textToCopy;
    document.body.appendChild(tempInput);
    
    // Selecionar e copiar o texto
    tempInput.select();
    document.execCommand('copy');
    
    // Remover o elemento temporário
    document.body.removeChild(tempInput);
    
    // Feedback visual
    const copyButton = document.querySelector('.copy-button i');
    copyButton.classList.remove('fa-copy');
    copyButton.classList.add('fa-check');
    setTimeout(() => {
        copyButton.classList.remove('fa-check');
        copyButton.classList.add('fa-copy');
    }, 2000);
} 