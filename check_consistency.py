import json

# Tu tabla de datos
data_from_table = {
    "AMARILLO": ["752", "349", "103", "865", "610"],
    "CELESTE": ["376", "785", "120", "897", "654"],
    "ROJO": ["014", "897", "352", "739", "321"],
    "VERDE": ["637", "843", "112", "203", "458"],
    "BLANCO": ["971", "320", "086", "651", "238"],
    "NARANJA": ["242", "630", "734", "641", "521"],
    "ROSA": ["310", "682", "614", "206", "738"],
    "VIOLETA": ["380", "245", "000", "139", "874"]
}

# Cargar JSON actual
with open('public/data/game-config.json', 'r', encoding='utf-8') as f:
    config = json.load(f)

print("🔍 VERIFICANDO INCONSISTENCIAS\n" + "="*60)

issues = []

for team in config['teams']:
    team_name = team['name'].upper()
    print(f"\n📍 Equipo {team_name}:")
    
    if team_name not in data_from_table:
        print(f"  ❌ ERROR: Equipo '{team_name}' no está en tu tabla!")
        issues.append(f"Equipo {team_name} no existe en tabla")
        continue
    
    expected_codes = data_from_table[team_name]
    actual_codes = [p['code'] for p in team['puzzles']]
    
    for i, (expected, actual) in enumerate(zip(expected_codes, actual_codes), 1):
        if expected != actual:
            print(f"  ❌ Puzzle {i}: Esperado '{expected}' pero tiene '{actual}'")
            issues.append(f"{team_name} - Puzzle {i}: {actual} → debería ser {expected}")
        else:
            print(f"  ✅ Puzzle {i}: {actual}")

print("\n" + "="*60)
if issues:
    print(f"\n⚠️  ENCONTRADAS {len(issues)} INCONSISTENCIAS:\n")
    for issue in issues:
        print(f"  • {issue}")
else:
    print("\n✅ ¡TODO CORRECTO! No hay inconsistencias.")
