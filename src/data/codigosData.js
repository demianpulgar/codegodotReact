// Datos centralizados de todos los códigos de Godot
// Cada código incluye: id, titulo, descripcion (con "Cómo implementarlo"), categoria, código, etc.

export const codigosData = [
  // ============================================
  // MOVIMIENTO
  // ============================================
  {
    id: 1,
    titulo: 'Movimiento básico del jugador 2D',
    descripcion: 'Sistema simple de movimiento para un personaje 2D. El jugador se mueve izquierda/derecha con las flechas del teclado.\n\n**Cómo implementarlo:**\n1. Crea un nodo CharacterBody2D\n2. Agrega un CollisionShape2D hijo (forma cápsula)\n3. Adjunta este script\n4. Presiona F5 para probar',
    categoria: 'Movimiento',
    fecha: 'Oct 12, 2025',
    autor: 'CodeGodot',
    likes: 42,
    guardados: 15,
    codigo: `extends CharacterBody2D

const SPEED = 300.0

func _physics_process(delta):
    var direction = Input.get_axis("ui_left", "ui_right")
    
    if direction:
        velocity.x = direction * SPEED
    else:
        velocity.x = move_toward(velocity.x, 0, SPEED)
    
    move_and_slide()`
  },
  {
    id: 2,
    titulo: 'Salto con gravedad',
    descripcion: 'Movimiento 2D con saltos realistas. El jugador salta cuando presiona espacio y cae con gravedad física.\n\n**Cómo implementarlo:**\n1. Crea CharacterBody2D con CollisionShape2D\n2. Crea un nodo StaticBody2D debajo como "suelo"\n3. Adjunta este script al jugador\n4. Ajusta JUMP_VELOCITY si necesitas saltos más altos',
    categoria: 'Movimiento',
    fecha: 'Oct 15, 2025',
    autor: 'CodeGodot',
    likes: 58,
    guardados: 28,
    codigo: `extends CharacterBody2D

const SPEED = 300.0
const JUMP_VELOCITY = -400.0

var gravity = ProjectSettings.get_setting("physics/2d/default_gravity")

func _physics_process(delta):
    # Aplicar gravedad
    if not is_on_floor():
        velocity.y += gravity * delta

    # Saltar si estamos en el suelo
    if Input.is_action_just_pressed("ui_accept") and is_on_floor():
        velocity.y = JUMP_VELOCITY

    # Movimiento horizontal
    var direction = Input.get_axis("ui_left", "ui_right")
    if direction:
        velocity.x = direction * SPEED
    else:
        velocity.x = move_toward(velocity.x, 0, SPEED)

    move_and_slide()`
  },
  {
    id: 3,
    titulo: 'Dash/Salto corto rápido',
    descripcion: 'Mechanic de dash: el jugador se mueve rápidamente en una dirección al presionar una tecla. Perfecto para evasión o ataque ágil.\n\n**Cómo implementarlo:**\n1. Configura el script en tu CharacterBody2D\n2. Cambia DASH_KEY si deseas otra tecla (ej: "shift")\n3. Ajusta DASH_SPEED y DASH_DURATION según necesites',
    categoria: 'Movimiento',
    fecha: 'Oct 18, 2025',
    autor: 'Elena Wong',
    likes: 72,
    guardados: 42,
    codigo: `extends CharacterBody2D

const SPEED = 300.0
const DASH_SPEED = 600.0
const DASH_DURATION = 0.3

var is_dashing = false
var dash_timer = 0.0

func _physics_process(delta):
    # Iniciar dash
    if Input.is_action_just_pressed("ui_cancel") and not is_dashing:
        is_dashing = true
        dash_timer = DASH_DURATION
    
    # Calcular velocidad
    var direction = Input.get_axis("ui_left", "ui_right")
    var current_speed = DASH_SPEED if is_dashing else SPEED
    
    if direction:
        velocity.x = direction * current_speed
    else:
        velocity.x = move_toward(velocity.x, 0, current_speed)
    
    # Actualizar dash
    if is_dashing:
        dash_timer -= delta
        if dash_timer <= 0:
            is_dashing = false
    
    move_and_slide()`
  },
  {
    id: 4,
    titulo: 'Rotación hacia el ratón',
    descripcion: 'El personaje se rota automáticamente para mirar hacia la posición del ratón. Útil para juegos de disparos o RPG.\n\n**Cómo implementarlo:**\n1. Adjunta a un Node2D o CharacterBody2D\n2. El script gira el nodo hacia el cursor automáticamente cada frame\n3. Personaliza la rotación con el código',
    categoria: 'Movimiento',
    fecha: 'Oct 20, 2025',
    autor: 'Marcus Johnson',
    likes: 51,
    guardados: 19,
    codigo: `extends Node2D

func _process(delta):
    # Obtener posición del ratón
    var mouse_pos = get_global_mouse_position()
    
    # Calcular ángulo hacia el ratón
    var direction = (mouse_pos - global_position).normalized()
    var angle = direction.angle()
    
    # Rotar hacia el ángulo
    rotation = angle`
  },

  // ============================================
  // INTERACCIÓN
  // ============================================
  {
    id: 5,
    titulo: 'Sistema de interacción simple',
    descripcion: 'Permite al jugador interactuar con objetos al presionar E. Ideal para recoger items, hablar con NPCs, abrir puertas.\n\n**Cómo implementarlo:**\n1. Crea un Area2D para el objeto interactuable\n2. Agrega un CollisionShape2D hijo\n3. Adjunta este script al Area2D\n4. Conecta la señal "interacted" a lo que desees hacer',
    categoria: 'Interacción',
    fecha: 'Oct 22, 2025',
    autor: 'CodeGodot',
    likes: 64,
    guardados: 31,
    codigo: `extends Area2D

signal interacted

func _ready():
    area_entered.connect(_on_area_entered)
    area_exited.connect(_on_area_exited)

func _process(delta):
    if overlaps_area(get_tree().get_first_child_in_group("player")) and Input.is_action_just_pressed("interact"):
        interact()

func interact():
    print("Interactuado con: ", name)
    emit_signal("interacted")

func _on_area_entered(area):
    if area.is_in_group("player"):
        print("Presiona E para interactuar")

func _on_area_exited(area):
    if area.is_in_group("player"):
        print("Saliste del área")`
  },
  {
    id: 6,
    titulo: 'Recoger items',
    descripcion: 'Script para items que el jugador puede recoger. Suma puntos o agrega al inventario cuando se toca.\n\n**Cómo implementarlo:**\n1. Crea un Area2D para el item\n2. Adjunta este script\n3. Personaliza POINTS_VALUE según el item\n4. Conecta a tu sistema de puntuación',
    categoria: 'Interacción',
    fecha: 'Oct 25, 2025',
    autor: 'Sarah Chen',
    likes: 48,
    guardados: 22,
    codigo: `extends Area2D

const POINTS_VALUE = 10

func _ready():
    area_entered.connect(_on_area_entered)

func _on_area_entered(area):
    if area.is_in_group("player"):
        print("Item recogido! +", POINTS_VALUE, " puntos")
        # Aquí agrega puntuación o inventario
        queue_free()  # Elimina el item`
  },
  {
    id: 7,
    titulo: 'Diálogo simple con NPC',
    descripcion: 'Sistema básico de diálogo. Muestra un panel de texto cuando hablas con un NPC. Presiona espacio para avanzar.\n\n**Cómo implementarlo:**\n1. Crea un CanvasLayer para el panel\n2. Agrega un Label hijo para el texto\n3. Adjunta este script al NPC (Area2D)\n4. Rellena el array "dialogues" con tu texto',
    categoria: 'Interacción',
    fecha: 'Oct 28, 2025',
    autor: 'CodeGodot',
    likes: 76,
    guardados: 45,
    codigo: `extends Area2D

var dialogues = [
    "Hola, bienvenido a mi tienda!",
    "Tengo muchos items interesantes.",
    "¿Quieres comprar algo?"
]

var current_dialogue = 0
var is_talking = false

func _ready():
    area_entered.connect(_on_area_entered)

func _process(delta):
    if is_talking and Input.is_action_just_pressed("ui_accept"):
        current_dialogue += 1
        if current_dialogue >= dialogues.size():
            end_dialogue()
        else:
            show_dialogue()

func _on_area_entered(area):
    if area.is_in_group("player"):
        start_dialogue()

func start_dialogue():
    is_talking = true
    current_dialogue = 0
    show_dialogue()

func show_dialogue():
    print(dialogues[current_dialogue])

func end_dialogue():
    is_talking = false
    current_dialogue = 0
    print("Diálogo terminado")`
  },

  // ============================================
  // COMBATE
  // ============================================
  {
    id: 8,
    titulo: 'Sistema de vida/salud básico',
    descripcion: 'Gestión de vida del jugador y de enemigos. Toma daño, cura, muere cuando la salud llega a 0.\n\n**Cómo implementarlo:**\n1. Agrega este script a tu personaje\n2. Conecta signals de daño desde enemigos\n3. Crea una UI que muestre la barra de vida',
    categoria: 'Combate',
    fecha: 'Nov 1, 2025',
    autor: 'CodeGodot',
    likes: 85,
    guardados: 52,
    codigo: `extends Node2D

signal health_changed
signal died

var max_health = 100
var current_health = 100

func _ready():
    emit_signal("health_changed", current_health, max_health)

func take_damage(damage: int):
    current_health -= damage
    print("Daño recibido: ", damage, " | Salud: ", current_health)
    emit_signal("health_changed", current_health, max_health)
    
    if current_health <= 0:
        die()

func heal(amount: int):
    current_health = min(current_health + amount, max_health)
    emit_signal("health_changed", current_health, max_health)

func die():
    print("El jugador ha muerto!")
    emit_signal("died")
    queue_free()`
  },
  {
    id: 9,
    titulo: 'Disparar proyectiles',
    descripcion: 'Script que permite disparar balas en la dirección del ratón. Perfecto para juegos de disparos.\n\n**Cómo implementarlo:**\n1. Crea una escena "Bullet" con Area2D y CollisionShape2D\n2. Agrega este script al jugador\n3. Guarda la escena de bala en res://Bullet.tscn\n4. Presiona clic izquierdo para disparar',
    categoria: 'Combate',
    fecha: 'Nov 4, 2025',
    autor: 'Lucas Patel',
    likes: 92,
    guardados: 61,
    codigo: `extends Node2D

var bullet_scene = preload("res://Bullet.tscn")
const BULLET_SPEED = 500.0

func _process(delta):
    if Input.is_action_just_pressed("attack"):
        shoot()

func shoot():
    var bullet = bullet_scene.instantiate()
    get_parent().add_child(bullet)
    
    bullet.global_position = global_position
    var direction = (get_global_mouse_position() - global_position).normalized()
    bullet.velocity = direction * BULLET_SPEED
    
    print("¡Disparo!")`
  },
  {
    id: 10,
    titulo: 'Detección de colisión para daño',
    descripcion: 'Causa daño cuando una bala o ataque golpea a un enemigo. Usa áreas de colisión para detectar impactos.\n\n**Cómo implementarlo:**\n1. Adjunta a un proyectil o arma\n2. Conecta la señal area_entered\n3. Verifica si el área golpeó un enemigo\n4. Llama a take_damage() del enemigo',
    categoria: 'Combate',
    fecha: 'Nov 7, 2025',
    autor: 'CodeGodot',
    likes: 77,
    guardados: 38,
    codigo: `extends Area2D

var damage = 10
var hit_targets = []  # Evita daño múltiple al mismo target

func _ready():
    area_entered.connect(_on_area_entered)

func _on_area_entered(area):
    if area.is_in_group("enemy") and area not in hit_targets:
        hit_targets.append(area)
        area.take_damage(damage)
        print("Golpe al enemigo!")
        queue_free()  # Elimina el proyectil`
  },

  // ============================================
  // ANIMACIONES
  // ============================================
  {
    id: 11,
    titulo: 'Animación de caminar',
    descripcion: 'Anima el personaje mientras camina con AnimatedSprite2D. La animación cambia según la dirección.\n\n**Cómo implementarlo:**\n1. Crea un AnimatedSprite2D hijo en tu personaje\n2. Crea animaciones "walk_left" y "walk_right" en el AnimatedSprite\n3. Adjunta este script\n4. Personaliza la velocidad de animación si necesitas',
    categoria: 'Animación',
    fecha: 'Nov 10, 2025',
    autor: 'CodeGodot',
    likes: 69,
    guardados: 33,
    codigo: `extends CharacterBody2D

const SPEED = 300.0
@onready var animated_sprite = $AnimatedSprite2D

func _physics_process(delta):
    var direction = Input.get_axis("ui_left", "ui_right")
    
    if direction != 0:
        velocity.x = direction * SPEED
        # Cambiar animación según dirección
        animated_sprite.animation = "walk_right" if direction > 0 else "walk_left"
        animated_sprite.play()
    else:
        velocity.x = move_toward(velocity.x, 0, SPEED)
        animated_sprite.stop()
    
    move_and_slide()`
  },
  {
    id: 12,
    titulo: 'Tween - Animación suave',
    descripcion: 'Usa Tween para animar objetos suavemente (mover, rotar, escalar). Muy útil para UI y efectos visuales.\n\n**Cómo implementarlo:**\n1. Adjunta a cualquier Node2D o Control\n2. El script anima el movimiento automáticamente\n3. Personaliza duration y el destino (target_pos)',
    categoria: 'Animación',
    fecha: 'Nov 13, 2025',
    autor: 'Sophie Laurent',
    likes: 81,
    guardados: 47,
    codigo: `extends Node2D

var target_pos = Vector2(400, 300)
var duration = 2.0

func _ready():
    var tween = create_tween()
    tween.set_trans(Tween.TRANS_QUAD)
    tween.set_ease(Tween.EASE_OUT)
    tween.tween_property(self, "position", target_pos, duration)

func animate_scale():
    var tween = create_tween()
    tween.tween_property(self, "scale", Vector2(1.5, 1.5), 0.5)
    tween.tween_property(self, "scale", Vector2(1.0, 1.0), 0.5)`
  },

  // ============================================
  // FÍSICA
  // ============================================
  {
    id: 13,
    titulo: 'Rebote elástico',
    descripcion: 'El objeto rebota cuando golpea paredes o suelo. Perfecto para bolas, piedras o efectos de explosión.\n\n**Cómo implementarlo:**\n1. Crea un RigidBody2D\n2. Agrega un CollisionShape2D\n3. Adjunta este script\n4. Personaliza ELASTICITY para más/menos rebote',
    categoria: 'Física',
    fecha: 'Nov 16, 2025',
    autor: 'CodeGodot',
    likes: 56,
    guardados: 24,
    codigo: `extends RigidBody2D

const ELASTICITY = 0.7
const FRICTION = 0.1

func _physics_process(delta):
    # Detectar colisión
    for i in get_slide_collision_count():
        var collision = get_slide_collision(i)
        var normal = collision.get_normal()
        
        # Invertir velocidad en dirección de la normal
        velocity = velocity.bounce(normal) * ELASTICITY
    
    move_and_slide()`
  },
  {
    id: 14,
    titulo: 'Atracción/Repulsión',
    descripcion: 'Los objetos se atraen o repelen uno del otro. Crea órbitas, campos de fuerza o imanes.\n\n**Cómo implementarlo:**\n1. Coloca dos Node2D en la escena\n2. Adjunta este script a uno de ellos\n3. Asigna la referencia al otro en el Inspector\n4. Personaliza FORCE_STRENGTH para intensidad',
    categoria: 'Física',
    fecha: 'Nov 19, 2025',
    autor: 'David Kim',
    likes: 43,
    guardados: 18,
    codigo: `extends Node2D

@export var target: Node2D
@export var FORCE_STRENGTH = 500.0
@export var is_repel = false  # true = repele, false = atrae

func _process(delta):
    if not target:
        return
    
    var direction = (target.global_position - global_position).normalized()
    if is_repel:
        direction = -direction
    
    global_position += direction * FORCE_STRENGTH * delta`
  },

  // ============================================
  // ENTRADA/INPUT
  // ============================================
  {
    id: 15,
    titulo: 'Soporte para gamepad/joystick',
    descripcion: 'Detecta entrada de gamepad (botones, joysticks) para controles completos de consola.\n\n**Cómo implementarlo:**\n1. Adjunta a tu jugador\n2. Conecta un gamepad al PC\n3. Los botones ya estarán mapeados en Input Map\n4. Personaliza según tus necesidades',
    categoria: 'Entrada',
    fecha: 'Nov 22, 2025',
    autor: 'CodeGodot',
    likes: 67,
    guardados: 36,
    codigo: `extends CharacterBody2D

const SPEED = 300.0

func _physics_process(delta):
    # Joystick izquierdo
    var gamepad_input = Input.get_vector("ui_left", "ui_right", "ui_up", "ui_down")
    
    if gamepad_input.length() > 0:
        velocity = gamepad_input.normalized() * SPEED
    else:
        velocity = Vector2.ZERO
    
    # Botón A del gamepad
    if Input.is_action_just_pressed("ui_accept"):
        print("Botón A presionado")
    
    move_and_slide()`
  },
  {
    id: 16,
    titulo: 'Entrada de ratón - Click para mover',
    descripcion: 'El personaje se mueve al lugar donde haces clic. Estilo point-and-click clásico.\n\n**Cómo implementarlo:**\n1. Adjunta a tu personaje (CharacterBody2D)\n2. Haz clic en la escena para mover\n3. El personaje caminará hacia el punto automáticamente',
    categoria: 'Entrada',
    fecha: 'Nov 25, 2025',
    autor: 'Anna Rodriguez',
    likes: 74,
    guardados: 41,
    codigo: `extends CharacterBody2D

const SPEED = 200.0
var target_position = null

func _input(event):
    if event is InputEventMouseButton and event.pressed:
        target_position = get_global_mouse_position()

func _physics_process(delta):
    if target_position:
        var direction = (target_position - global_position).normalized()
        
        if global_position.distance_to(target_position) > 10:
            velocity = direction * SPEED
        else:
            velocity = Vector2.ZERO
            target_position = null
    
    move_and_slide()`
  },

  // ============================================
  // UI
  // ============================================
  {
    id: 17,
    titulo: 'Barra de vida visual',
    descripcion: 'UI que muestra la salud como barra. Se actualiza cuando tomas daño o te curas.\n\n**Cómo implementarlo:**\n1. Crea un Control con un ColorRect hijo para la barra\n2. Adjunta este script\n3. Conecta con tu sistema de vida\n4. Personaliza los colores (rojo para bajo, verde para alto)',
    categoria: 'UI',
    fecha: 'Nov 28, 2025',
    autor: 'CodeGodot',
    likes: 89,
    guardados: 58,
    codigo: `extends Control

@onready var health_bar = $ColorRect

var max_health = 100
var current_health = 100

func _ready():
    update_bar()

func take_damage(damage):
    current_health -= damage
    update_bar()

func update_bar():
    var percentage = current_health / float(max_health)
    health_bar.size.x = 200 * percentage  # Ajusta 200 al ancho deseado
    
    # Cambiar color según salud
    if percentage > 0.5:
        health_bar.color = Color.GREEN
    elif percentage > 0.25:
        health_bar.color = Color.YELLOW
    else:
        health_bar.color = Color.RED`
  },
  {
    id: 18,
    titulo: 'Menú pausa simple',
    descripcion: 'Pausa el juego cuando presionas ESC. Muestra un panel con botones de reanudar y salir.\n\n**Cómo implementarlo:**\n1. Crea un CanvasLayer para el menú\n2. Agrega botones y etiquetas\n3. Adjunta este script\n4. El juego se pausa automáticamente',
    categoria: 'UI',
    fecha: 'Dic 1, 2025',
    autor: 'James Wilson',
    likes: 102,
    guardados: 73,
    codigo: `extends CanvasLayer

var is_paused = false

func _ready():
    visible = false

func _process(delta):
    if Input.is_action_just_pressed("ui_cancel"):
        toggle_pause()

func toggle_pause():
    is_paused = !is_paused
    visible = is_paused
    get_tree().paused = is_paused
    
    print("Paused: ", is_paused)

func _on_resume_pressed():
    toggle_pause()

func _on_quit_pressed():
    get_tree().quit()`
  },
  {
    id: 19,
    titulo: 'Sistema de puntuación',
    descripcion: 'Gestiona puntos del jugador. Suma puntos, muestra en pantalla, guarda máximo.\n\n**Cómo implementarlo:**\n1. Crea un Label en la UI\n2. Adjunta este script a un Node de control general\n3. Conecta signals para sumar puntos\n4. El Label se actualiza automáticamente',
    categoria: 'UI',
    fecha: 'Dic 4, 2025',
    autor: 'CodeGodot',
    likes: 71,
    guardados: 44,
    codigo: `extends Node

var current_score = 0
var high_score = 0
var score_label: Label

func _ready():
    score_label = get_node("CanvasLayer/ScoreLabel")  # Ajusta la ruta
    load_high_score()
    update_display()

func add_score(amount: int):
    current_score += amount
    if current_score > high_score:
        high_score = current_score
        save_high_score()
    update_display()

func update_display():
    score_label.text = "Score: " + str(current_score)

func save_high_score():
    print("Nuevo máximo: ", high_score)

func load_high_score():
    print("Máximo anterior: ", high_score)`
  },
  {
    id: 20,
    titulo: 'Fade in/out de pantalla',
    descripcion: 'Oscurece la pantalla gradualmente (fade out) o la aclara (fade in). Perfecto para transiciones entre niveles.\n\n**Cómo implementarlo:**\n1. Crea un CanvasLayer con un ColorRect negro\n2. Adjunta este script\n3. Llama a fade_out() o fade_in() desde otros scripts\n4. Usa para transiciones de niveles',
    categoria: 'UI',
    fecha: 'Dic 7, 2025',
    autor: 'Rosa García',
    likes: 58,
    guardados: 31,
    codigo: `extends CanvasLayer

@onready var fade_rect = $ColorRect  # Debe ser ColorRect negro

func fade_out(duration = 1.0):
    var tween = create_tween()
    tween.tween_property(fade_rect, "modulate:a", 1.0, duration)

func fade_in(duration = 1.0):
    var tween = create_tween()
    tween.tween_property(fade_rect, "modulate:a", 0.0, duration)

func change_scene(scene_path: String, fade_duration = 1.0):
    fade_out(fade_duration)
    await get_tree().create_timer(fade_duration).timeout
    get_tree().change_scene_to_file(scene_path)`
  },

  // ============================================
  // SEÑALES
  // ============================================
  {
    id: 21,
    titulo: 'Sistema de señales básico',
    descripcion: 'Usa señales para comunicar eventos entre nodos sin acoplamiento. Un botón emite una señal, otros nodos la escuchan.\n\n**Cómo implementarlo:**\n1. Define una signal en el script del emisor\n2. Emite la señal con emit_signal()\n3. Otros scripts se conectan con .connect()\n4. Responden cuando se emite',
    categoria: 'Señales',
    fecha: 'Dic 10, 2025',
    autor: 'CodeGodot',
    likes: 64,
    guardados: 37,
    codigo: `# Script del emisor (Botón)
extends Button

signal button_pressed

func _ready():
    pressed.connect(_on_pressed)

func _on_pressed():
    emit_signal("button_pressed")
    print("Botón presionado!")

# Script del receptor (otro nodo)
extends Node

func _ready():
    var button = get_node("Button")
    button.button_pressed.connect(_on_button_pressed)

func _on_button_pressed():
    print("¡Recibí la señal del botón!")`
  },
  {
    id: 22,
    titulo: 'Eventos globales con Autoload',
    descripcion: 'Crea un singleton global que emite eventos para toda la aplicación. Útil para cambios de nivel, música, efectos globales.\n\n**Cómo implementarlo:**\n1. Crea un script nuevo (EventManager.gd)\n2. Añádelo como Autoload en Project Settings\n3. Otros scripts emiten con EventManager.level_complete.emit()\n4. Conecta desde cualquier parte del juego',
    categoria: 'Señales',
    fecha: 'Dic 13, 2025',
    autor: 'Kevin Lee',
    likes: 77,
    guardados: 49,
    codigo: `# EventManager.gd - Añadido como Autoload
extends Node

signal level_complete
signal player_died
signal enemy_spawned

func emit_level_complete(level_num: int):
    emit_signal("level_complete", level_num)

func emit_player_died():
    emit_signal("player_died")

# En otros scripts:
# EventManager.level_complete.connect(_on_level_complete)
# func _on_level_complete(level):
#     print("¡Nivel ", level, " completado!")`
  },

  // ============================================
  // EFECTOS
  // ============================================
  {
    id: 23,
    titulo: 'Partículas de explosión',
    descripcion: 'Crea un efecto de partículas cuando algo explota. Usa GPUParticles2D para rendimiento óptimo.\n\n**Cómo implementarlo:**\n1. Crea un nodo GPUParticles2D\n2. Configura el material y las propiedades de emisión\n3. Adjunta este script\n4. Llama a explode() cuando necesites el efecto',
    categoria: 'Efectos',
    fecha: 'Dic 16, 2025',
    autor: 'CodeGodot',
    likes: 73,
    guardados: 45,
    codigo: `extends GPUParticles2D

func _ready():
    emitting = false

func explode():
    emitting = true
    # Detener después de que terminen las partículas
    await get_tree().create_timer(lifetime).timeout
    queue_free()

# Llamar desde otro script:
# var explosion = explosion_scene.instantiate()
# get_parent().add_child(explosion)
# explosion.global_position = your_position
# explosion.explode()`
  },
  {
    id: 24,
    titulo: 'Sonidos de efectos (SFX)',
    descripcion: 'Reproduce sonidos cuando ocurren eventos (salto, golpe, recoger item). Maneja volumen y reproducción.\n\n**Cómo implementarlo:**\n1. Crea un nodo AudioStreamPlayer\n2. Carga un archivo .ogg o .mp3\n3. Adjunta este script\n4. Llama a play_sound() desde eventos',
    categoria: 'Efectos',
    fecha: 'Dic 19, 2025',
    autor: 'Lisa Park',
    likes: 82,
    guardados: 52,
    codigo: `extends AudioStreamPlayer

@export var jump_sound: AudioStream
@export var hit_sound: AudioStream
@export var pickup_sound: AudioStream

func play_jump():
    play_sound(jump_sound)

func play_hit():
    play_sound(hit_sound)

func play_pickup():
    play_sound(pickup_sound)

func play_sound(sound: AudioStream):
    if sound:
        stream = sound
        play()
    else:
        print("Sound not assigned")`
  },
  {
    id: 25,
    titulo: 'Cámara que sigue al jugador',
    descripcion: 'La cámara sigue al personaje del jugador en todo momento. Mantiene el juego centrado y visible.\n\n**Cómo implementarlo:**\n1. Crea un nodo Camera2D hijo del jugador\n2. O adjunta este script a una Camera2D\n3. Personaliza SMOOTHING para velocidad de seguimiento\n4. Agrega límites de cámara si necesitas',
    categoria: 'Cámara',
    fecha: 'Dic 22, 2025',
    autor: 'CodeGodot',
    likes: 96,
    guardados: 61,
    codigo: `extends Camera2D

@export var target: Node2D
@export var smoothing = 0.1
@export var offset = Vector2.ZERO

var limit_left = -100000
var limit_right = 100000
var limit_top = -100000
var limit_bottom = 100000

func _process(delta):
    if not target:
        return
    
    var desired_pos = target.global_position + offset
    global_position = global_position.lerp(desired_pos, smoothing)
    
    # Aplicar límites
    global_position.x = clamp(global_position.x, limit_left, limit_right)
    global_position.y = clamp(global_position.y, limit_top, limit_bottom)`
  }
]

// Array de categorías únicas
export const categories = [
  "Movimiento",
  "Interacción",
  "Combate",
  "Animación",
  "Física",
  "Entrada",
  "UI",
  "Señales",
  "Efectos",
  "Cámara"
]
