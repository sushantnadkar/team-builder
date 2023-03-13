export class Apis {
    public async getMode(): Promise<any> {
        const response = await fetch('/api/get-mode');
        return await response.json();
    }
    public async setMode(mode: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const response = await fetch('/api/set-mode', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({mode: mode})
            })
            resolve(response.json());
        });
    }
    public async getCardNumber(name: String): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const response = await fetch('/api/get-card-number', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name: name})
            });
            resolve(response.json());
        });
    }
}