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

    // Cálculo do preço base
    const basePrice = factoryPrice + baseProfit + shipping;

    // Cálculo das taxas
    const cardFee = basePrice * 0.05; // Taxa de 5% para cartão
    const installmentFee = basePrice * 0.07; // Taxa de 7% para parcelamento

    // Cálculo do preço final
    const installmentPrice = basePrice + cardFee + installmentFee; // Preço parcelado

    // Cálculo da porcentagem de lucro
    const baseWithoutProfit = factoryPrice + shipping;
    const profitPercentage = (baseProfit / baseWithoutProfit) * 100;

    // Exibir resultados
    document.getElementById('installmentPrice').textContent = installmentPrice.toFixed(2);
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

function copyTotal(elementId) {
    const totalValue = document.getElementById(elementId).textContent;
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
    const copyButton = document.querySelector(`[onclick="copyTotal('${elementId}')"] i`);
    copyButton.classList.remove('fa-copy');
    copyButton.classList.add('fa-check');
    setTimeout(() => {
        copyButton.classList.remove('fa-check');
        copyButton.classList.add('fa-copy');
    }, 2000);
} 