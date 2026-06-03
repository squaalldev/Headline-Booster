import os
from dotenv import load_dotenv
from supabase import create_client

load_dotenv()

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")

print(f" Conectando a: {url}")
print(f" Key: {key[:20]}...")

try:
    supabase = create_client(url, key)
    
    # Probar conexión con una tabla que ya existe
    result = supabase.table("personalities").select("*").execute()
    
    print(f"\n CONEXIÓN EXITOSA!")
    print(f" Personalidades encontradas: {len(result.data)}")
    
except Exception as e:
    print(f"\n❌ Error: {e}")
    
    # Si el error es de tabla, crear las tablas
    if "relation" in str(e) and "does not exist" in str(e):
        print("\n⚠️ Las tablas no están creadas aún.")
        print(" Ve a: https://supabase.com/dashboard/project/vuhmmscasuvserzdgtph/sql")
        print(" Ejecuta el script SQL que te di antes con CREATE TABLE")